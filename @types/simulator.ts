export type Grid = Array<Array<Robot | null>>;
export type Direction = "NORTH" | "WEST" | "SOUTH" | "EAST";
export type Robot = {
  direction: Direction | null;
  position: { x: number; y: number } | null;
};
