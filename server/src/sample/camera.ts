import { Camera } from "../type/msg.ts";

export const cameras: Camera[] = Array.from({ length: 10 }).map((_, i) => {
  const jpeg = Deno.readFileSync(`./src/sample/camera/${i}.jpg`);
  return { id: i, jpeg: jpeg.buffer };
});
