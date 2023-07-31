import { Tools } from "@babylonjs/core/Misc/tools";

import { TTribes } from "../../constants/tribe";
import { Units } from "../../constants/unit";
import { TUnitInstance } from "../../types/unit";
import { START_UNITS_BY_TRIBE } from "../constants";

export const getInitialUnits = (tribes: TTribes[]) => {
  return tribes.reduce<{
    allUnits: Record<string, TUnitInstance>;
    unitsByTribe: TUnitInstance[][];
  }>(
    (acc, tribe) => {
      const tribeUnitTypes = START_UNITS_BY_TRIBE[tribe];

      const tribeUnits = tribeUnitTypes.map((unitType) => {
        const unit = {
          id: Tools.RandomId(),
          tribe,
          ...Units[unitType],
        };

        acc.allUnits[unit.id] = unit;

        return unit;
      });

      acc.unitsByTribe.push(tribeUnits);

      return acc;
    },
    { allUnits: {}, unitsByTribe: [] },
  );
};
