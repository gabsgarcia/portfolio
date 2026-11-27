// POST /api/prumo/chat: the Prumo demo's assistant.
// Takes the conversation so far, checks the daily limits, and streams Claude's answer
// back as plain text. Errors before the stream starts come back as JSON { error }.

import Anthropic from "@anthropic-ai/sdk";
import { loadKnowledge, systemPrompt, takeQuestion, visitorKey } from "@/lib/prumoChat";

const MODEL = "claude-haiku-5-5";
const MAX_TURNS = 12; // older turns are dropped: the answers are short and stand alone
const MAX_CHARS = 800;

type Turn = { role: "user" | "assistant"; content: string };

function fail(error: "offline" | "limit" | "busy" | "tooLong" | "bad", status: number) {
  return Response.json({ error }, { status });
}

function parse(body: unknown): Turn[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const turns = (body as { messages: unknown[] }).messages;
  const clean: Turn[] = [];
  for (const t of turns) {
    if (!t || typeof t !== "object") return null;
    const { role, content } = t as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) return null;
    clean.push({ role, content: content.trim() });
  }
  if (!clean.length || clean[clean.length - 1].role !== "user") return null;
  return clean.slice(-MAX_TURNS);
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return fail("offline", 503);

  const turns = parse(await request.json().catch(() => null));
  if (!turns) return fail("bad", 400);
  if (turns[turns.length - 1].content.length > MAX_CHARS) return fail("tooLong", 413);
  // The history must start with the visitor, and the API wants that too.
  while (turns.length && turns[0].role !== "user") turns.shift();

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  const day = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  let left: number;
  try {
    left = await takeQuestion(visitorKey(ip, day), day);
  } catch {
    return fail("busy", 503);
  }
  if (left < 0) return fail("limit", 429);

  const client = new Anthropic();
  const knowledge = await loadKnowledge();

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 8000,
    // Short, friendly answers from a fixed list: little reasoning needed.
    output_config: { effort: "low" },
    // The instructions and the studio's answers are the same on every request, so they
    // are cached: later questions pay about a tenth for that part.
    system: [{ type: "text", text: systemPrompt(knowledge), cache_control: { type: "ephemeral" } }],
    messages: turns.map((t) => ({ role: t.role, content: t.content.slice(0, MAX_CHARS * 2) })),
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n\n[[recepcao]]"));
        }
      } catch (error) {
        // The visitor sees a calm message; the details go to the server log.
        console.error("prumo chat:", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
        controller.enqueue(encoder.encode("\n\n[[erro]]"));
      } finally {
        controller.close();
      }
    },
    cancel() {
      // The visitor pressed "stop": stop paying for tokens nobody will read.
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Questions-Left": String(left),
    },
  });
}
