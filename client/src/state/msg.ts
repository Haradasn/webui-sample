import { useEffect } from "react";
import { atom, useSetAtom } from "jotai";
import socketIOClient from "socket.io-client";

import { Msg, Camera, Car, Model } from "../type/msg";

export const lastCamAtom = atom<Camera | null>(null);
export const lastCarAtom = atom<Car | null>(null);
export const lastModelAtom = atom<Model | null>(null);

export const useSocketIO = (url: string) => {
  const setLastCar = useSetAtom(lastCarAtom);
  const setLastCam = useSetAtom(lastCamAtom);
  const setLastModel = useSetAtom(lastModelAtom);

  useEffect(() => {
    const socket = socketIOClient(url);
    socket.on("connect", () => {
      console.log("Connected: ", url);
    });

    socket.on("disconnect", async () => {
      console.log("Disconnected: ", url);
    });

    socket.on("msg", (data) => {
      console.log("msg", data);
      if (data.kind) {
        const msg = data as Msg;
        if (msg.kind === "camera") setLastCam(msg.data);
        if (msg.kind === "model") setLastModel(msg.data);
        if (msg.kind === "car") setLastCar(msg.data);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("cereal");
      socket.off("monitoringResult");
      socket.disconnect();
    };
  }, [url]);
};
