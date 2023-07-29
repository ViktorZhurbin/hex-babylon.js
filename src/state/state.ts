import { Scene } from "@babylonjs/core";
import { observable } from "@legendapp/state";

import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";
import { generateGrid } from "../utils/generateGrid";
import { setMoveArea } from "./setMoveArea";

export type State = {
  grid: ReturnType<typeof generateGrid>;
  moveArea: string[];
  scene: Scene | null;
  selectedHex: THex | null;
  setMoveArea: (moveArea: State["moveArea"]) => void;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  grid: {
    array: [],
    middleRowIndex: 0,
    rowsCount: 0,
    sideLength: 0,
  },
  moveArea: [],
  scene: null,
  selectedHex: null,
  setMoveArea,
  units: {},
});
