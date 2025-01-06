import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import { cars } from "./sample/car.ts";
import { Msg } from "./type/msg.ts";
import { cameras } from "./sample/camera.ts";
import { models } from "./sample/model.ts";

const io = new Server({
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`<=> ${socket.id}`);
  socket.on("disconnect", (reason) => {
    console.log(`... ${socket.id} (${reason})`);
  });
});

// ダミーデータを送り続けます

let idx_cam = 0;
setInterval(() => {
  const camera = cameras.at(idx_cam);
  if (camera) io.emit("msg", { kind: "camera", data: camera } as Msg);
  idx_cam = (idx_cam + 1) % 10;
}, 1000);

let idx_car = 0;
setInterval(() => {
  const car = cars.at(idx_car);
  if (car) io.emit("msg", { kind: "car", data: car } as Msg);
  idx_car = (idx_car + 1) % cars.length;
}, 100);

let idx_model = 0;
setInterval(() => {
  const model = models.at(idx_model);
  if (model) io.emit("msg", { kind: "model", data: model } as Msg);
  idx_model = (idx_model + 1) % models.length;
}, 100);

await serve(io.handler(), { port: 3000 });
