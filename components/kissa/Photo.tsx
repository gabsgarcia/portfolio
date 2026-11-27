import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { photos, type PhotoKey } from "@/content/kissa";
import type { Lang } from "@/lib/i18n";

/**
 * A photo of the café. Until the real JPG is in public/demos/kissa/, it shows a quiet
 * placeholder in the photo's own tone, with a caption saying what goes there.
 * The check runs at build time, so adding a file and redeploying is all it takes.
 */
export function Photo({
  name,
  lang,
  sizes,
  priority,
  className,
}: {
  name: PhotoKey;
  lang: Lang;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const alt = photos[name][lang];
  const file = `/demos/kissa/${name}.jpg`;
  const ready = existsSync(join(process.cwd(), "public", file));

  return (
    <figure className={`ks-photo ks-photo--${name} ${className ?? ""}`}>
      {ready ? (
        <Image src={file} alt={alt} fill sizes={sizes} priority={priority} />
      ) : (
        <div className="ks-photo-slot" role="img" aria-label={alt}>
          <span className="ks-photo-caption" aria-hidden="true">
            {alt}
          </span>
        </div>
      )}
    </figure>
  );
}
