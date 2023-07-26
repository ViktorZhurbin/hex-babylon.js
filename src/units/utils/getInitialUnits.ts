import { TTribes } from "../../constants/tribe";
import { getTribeUnits } from "./getTribeUnits";

export const getInitialUnits = (tribes: TTribes[]) =>
  tribes.reduce<ReturnType<typeof getTribeUnits>>((acc, tribe) => {
    return { ...acc, ...getTribeUnits(tribe) };
  }, {});
