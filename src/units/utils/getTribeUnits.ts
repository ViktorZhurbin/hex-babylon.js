import { Tools } from "@babylonjs/core";

import { TTribes } from "../../constants/tribe";
import { Units } from "../../constants/unit";
import { TUnitInstance } from "../../types/unit";
import { START_UNITS_BY_TRIBE } from "../constants";

export const getTribeUnits = (tribe: TTribes) => {
  return START_UNITS_BY_TRIBE[tribe]?.reduce<Record<string, TUnitInstance>>(
    (acc, type) => {
      const id = Tools.RandomId();

      acc[id] = { id, tribe, ...Units[type] };

      return acc;
    },
    {},
  );
};
