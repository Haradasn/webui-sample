import { useEffect, useRef } from "react";
import { useCam } from "../../state/msg";
import style from "./Camera.module.css";

export const Camera = () => {
  const camera = useCam();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (camera && canvasRef.current) {
      const arrayBuf = camera.jpeg;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvasRef.current!.width = img.width;
          canvasRef.current!.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        img.src = URL.createObjectURL(new Blob([arrayBuf]));
      }
    }
  }, [camera]);

  return (
    <div className={style.container}>
      <canvas className={style.camera} ref={canvasRef} />
    </div>
  );
};
