import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { photos, type PhotoKey } from "@/content/prumo";
import type { Lang } from "@/lib/i18n";

/**
 * A detail photo of the studio. Until the real JPG is in public/demos/prumo/, it shows
 * a drawn placeholder with a caption saying what goes there. The check runs at build time.
 */
export function Photo({ name, lang, sizes, className }: { name: PhotoKey; lang: Lang; sizes: string; className?: string }) {
  const alt = photos[name][lang];
  const file = `/demos/prumo/${name}.jpg`;
  const ready = existsSync(join(process.cwd(), "public", file));
  return (
    <figure className={`pr-photo ${className ?? ""}`}>
      {ready ? (
        <Image src={file} alt={alt} fill sizes={sizes} />
      ) : (
        <div className="pr-photo-slot" role="img" aria-label={alt}>
          <span aria-hidden="true">{alt}</span>
        </div>
      )}
    </figure>
  );
}
