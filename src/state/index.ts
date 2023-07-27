import { Scene } from "@babylonjs/core";
import { observable } from "@legendapp/state";

import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";

export type State = {
  moveArea: Record<string, number[]>;
  scene: Scene | null;
  selectedHex: THex | null;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  moveArea: {},
  scene: null,
  selectedHex: null,
  units: {},
});
