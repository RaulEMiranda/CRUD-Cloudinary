import { writeFile } from "fs/promises";
import path from "path";

export default async function processImage(imageField: File | null) {
  
  const image = imageField as File;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filepath = path.join(process.cwd(), "public", image.name);
  await writeFile(filepath, buffer);
  return filepath
}