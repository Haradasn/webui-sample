import { FC } from "react";

import { Canvas, Quaternion, Vector3 } from "@react-three/fiber";
import { CameraControls, Line, PerspectiveCamera } from "@react-three/drei";
import { BoxGeometry } from "three";

import { BBox, Path, Road } from "../../type/msg";
import { useCar, useModel } from "../../state/msg";

export const Model: FC = () => {
  const model = useModel();
  const car = useCar();

  return (
    <Canvas>
      <CameraControls />
      <PerspectiveCamera
        makeDefault
        zoom={1}
        position={[0, -27, 24]}
        rotation={[Math.PI / 3.7, 0, 0]}
      />
      <ambientLight intensity={3} />
      <gridHelper
        args={[200, 200, "lightgray", "gray"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />
      <axesHelper args={[5]} />
      <EgoCar
        leftBlinker={car?.blinker.left}
        rightBlinker={car?.blinker.right}
      />
      {model && <PathView path={model.path} />}
      {model && model.bbox.map((bbox,i) => <BBoxView key={i} bbox={bbox} />)}
      {model && model.road.map((road,i) => <RoadView key={i} road={road} />)}
    </Canvas>
  );
};

const EgoCar: FC<{ leftBlinker?: boolean; rightBlinker?: boolean }> = ({
  leftBlinker,
  rightBlinker,
}) => {
  return (
    <mesh position={[0, 0, 1]}>
      <boxGeometry args={[2, 4, 2]} />
      <meshStandardMaterial color="gray" />
      {leftBlinker && (
        <mesh position={[-0.75, -2, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      )}
      {rightBlinker && (
        <mesh position={[0.75, -2, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      )}
    </mesh>
  );
};

const PathView: FC<{ path: Path }> = ({ path }) => {
  return (
    <Line
      points={path.map((p) => [p.x, p.y, p.z] as Vector3)}
      color={"red"}
      lineWidth={4}
    />
  );
};

const BBoxView: FC<{ bbox: BBox }> = ({ bbox }) => {
  const pos = [bbox.pos.x, bbox.pos.y, bbox.pos.z] as Vector3;
  const rot = [bbox.rot.w, bbox.rot.i, bbox.rot.j, bbox.rot.k] as Quaternion;
  const size = [bbox.size.x, bbox.size.y, bbox.size.z];
  return (
    <mesh position={pos} quaternion={rot}>
      <lineSegments>
        <edgesGeometry args={[new BoxGeometry(...size)]} />
        <lineBasicMaterial color="green" linewidth={8} />
      </lineSegments>
    </mesh>
  );
};

const RoadView: FC<{ road: Road }> = ({ road }) => {
  const COLORS = { Center: "yellow", Edge: "white" };
  return (
    <Line
      points={road.path.map((p) => [p.x, p.y, p.z] as Vector3)}
      color={COLORS[road.kind]}
      lineWidth={4}
    />
  );
};
