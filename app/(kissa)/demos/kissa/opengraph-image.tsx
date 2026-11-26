import { copy } from "@/content/kissa";
import { ogSize } from "@/lib/og";
import { renderKissaOg } from "@/lib/kissaOg";

export const size = ogSize;
export const contentType = "image/png";
export const alt = copy.pt.metaDescription;

export default function Image() {
  return renderKissaOg("pt");
}
