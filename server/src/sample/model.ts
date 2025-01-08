import { Model } from "../type/msg.ts";

export const models: Model[] = Array.from({ length: 100 }).map((_, t) => {
  const path = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.sin(t / 4 + i / 2) * 0.5,
    y: i - 5,
    z: 0,
  }));
  const left = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.sin(t / 4 + i / 2) - 2,
    y: i - 5,
    z: 0,
  }));
  const center = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.sin(t / 4 + i / 2) + 2,
    y: i - 5,
    z: 0,
  }));
  const right = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.sin(t / 4 + i / 2) + 6,
    y: i - 5,
    z: 0,
  }));
  const car_pos = { x: Math.sin(t / 4) * 0.5, y: 8, z: 1 };
  const car_rot = -(Math.cos(t / 4) * Math.PI) / 16;
  return {
    path: path,
    road: [
      { kind: "Edge", path: left },
      { kind: "Center", path: center },
      { kind: "Edge", path: right },
    ],
    bbox: [
      {
        kind: "Car",
        size: { x: 2, y: 4, z: 2 },
        rot: {
          w: Math.cos(car_rot),
          i: Math.sin(car_rot),
          j: 0,
          k: 0,
        },
        pos: car_pos,
      },
    ],
  };
});
