import { labCopy } from "@/lib/lab";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = labCopy.en.metaTitle;

export default function Image() {
  return renderOgImage("en", { title: labCopy.en.metaTitle, subtitle: labCopy.en.metaDescription });
}
