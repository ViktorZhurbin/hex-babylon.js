import { TTribes } from "../../constants/tribe";
import { State } from "../../state";
import { getTribeUnits } from "./getTribeUnits";

export const getInitialUnits = (tribes: TTribes[]): State["units"] =>
  tribes.reduce<ReturnType<typeof getTribeUnits>>((acc, tribe) => {
    return { ...acc, ...getTribeUnits(tribe) };
  }, {});
