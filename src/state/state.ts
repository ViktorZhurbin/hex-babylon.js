import { Scene } from "@babylonjs/core";
import { observable } from "@legendapp/state";

import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";
import { setMoveArea } from "./setMoveArea";

export type State = {
  grid: {
    RowsCount: number;
    SideLength: number;
  };
  moveArea: string[];
  scene: Scene | null;
  selectedHex: THex | null;
  setMoveArea: (moveArea: State["moveArea"]) => void;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  grid: {
    RowsCount: 0,
    SideLength: 0,
  },
  moveArea: [],
  scene: null,
  selectedHex: null,
  setMoveArea,
  units: {},
});
