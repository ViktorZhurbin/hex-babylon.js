import { Tribes } from "../../constants/tribe";
import { TUnitTypes, UnitTypes } from "../../constants/unit";

export const START_UNITS_BY_TRIBE: Record<string, TUnitTypes[]> = {
  [Tribes.tribeOne]: [UnitTypes.typeOne, UnitTypes.typeTwo],
  [Tribes.tribeTwo]: [UnitTypes.typeOne, UnitTypes.typeTwo],
};

export const Unit = {
  BaseName: "unit",
};
