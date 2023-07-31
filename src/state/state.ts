import { Scene } from "@babylonjs/core/scene";
import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";
import { setMoveArea } from "./setMoveArea";

export type State = {
  grid: Grid<Hex> | null;
  moveArea: Grid<Hex> | null;
  scene: Scene | null;
  selectedHex: THex | null;
  setMoveArea: (moveArea: State["moveArea"]) => void;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  grid: null,
  moveArea: null,
  scene: null,
  selectedHex: null,
  setMoveArea,
  units: {},
});
