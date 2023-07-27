import { Scene } from "@babylonjs/core";
import { observable } from "@legendapp/state";

import { THexId } from "../map/utils/hexId";
import { THex } from "../types/map";
import { TUnitInstance } from "../types/unit";
import { setMoveArea } from "./observe";

export type State = {
  moveArea: THexId[];
  scene: Scene | null;
  selectedHex: THex | null;
  setMoveArea: (moveArea: THexId[]) => void;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  moveArea: [],
  scene: null,
  selectedHex: null,
  setMoveArea,
  units: {},
});
