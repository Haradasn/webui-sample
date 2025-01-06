import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import socketIOClient from "socket.io-client";

import { Msg, Camera, Car, Model } from "../type/msg";

export const lastCamState = atom<Camera | null>({
  key: "lastCam",
  default: null,
});

export const lastCarState = atom<Car | null>({
  key: "lastCar",
  default: null,
});

export const lastModelState = atom<Model | null>({
  key: "lastModel",
  default: null,
});

export const useSocketIO = (url: string) => {
  const setLastCar = useSetRecoilState(lastCarState);
  const setLastCam = useSetRecoilState(lastCamState);
  const setLastModel = useSetRecoilState(lastModelState);

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
