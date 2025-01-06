import { useSocketIO } from "../state/msg";
import { Camera } from "./Camera/Camera";
import { Nav } from "./Nav/Nav";
import { Model } from "./Model/Model";
import style from "./App.module.css";

export const App = () => {
  useSocketIO("http://localhost:3000");
  return (
    <div className={style.app}>
      <Camera />
      <Model />
      <Nav />
    </div>
  );
};
