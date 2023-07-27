import { Scene } from "@babylonjs/core";
import { observable } from "@legendapp/state";

import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";
import { THexId } from "../utils/hexId";
import { setMoveArea } from "./setMoveArea";

export type State = {
  grid: {
    RowsCount: number;
    SideLength: number;
  };
  moveArea: THexId[];
  scene: Scene | null;
  selectedHex: THex | null;
  setMoveArea: (moveArea: THexId[]) => void;
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
