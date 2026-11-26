import { labCopy } from "@/lib/lab";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = labCopy.pt.metaTitle;

export default function Image() {
  return renderOgImage("pt", { title: labCopy.pt.metaTitle, subtitle: labCopy.pt.metaDescription });
}
