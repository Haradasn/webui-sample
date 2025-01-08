import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import socketIOClient from "socket.io-client";
import { Msg, Camera, Car, Model } from "../type/msg";

const lastCamState = atom<Camera | null>(null);
const lastCarState = atom<Car | null>(null);
const lastModelState = atom<Model | null>(null);

export const useCam = () => useAtomValue(lastCamState);
export const useCar = () => useAtomValue(lastCarState);
export const useModel = () => useAtomValue(lastModelState);

export const useSocketIO = (url: string) => {
  const setLastCar = useSetAtom(lastCarState);
  const setLastCam = useSetAtom(lastCamState);
  const setLastModel = useSetAtom(lastModelState);

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
  }, [setLastCam, setLastCar, setLastModel, url]);
};
