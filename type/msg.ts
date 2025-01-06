export type Msg =
  | { kind: "camera"; data: Camera }
  | { kind: "model"; data: Model }
  | { kind: "car"; data: Car };

export type Camera = { id: number; jpeg: ArrayBufferLike };

export type Model = { path: Path; road: Road[]; bbox: BBox[] };
export type Path = XYZ[];
export type Road = { kind: "Center" | "Edge"; path: XYZ[] };
export type BBox = { kind: "Car" | "Human"; size: XYZ; rot: Quat; pos: XYZ };

export type Car = { geoloc: Geo; blinker: { left: boolean; right: boolean } };

export type XYZ = { x: number; y: number; z: number };
export type Quat = { w: number; i: number; j: number; k: number };
export type Geo = { lat: number; lng: number; alt: number };
