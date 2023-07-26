import { Scene } from "@babylonjs/core";

import { TTribes } from "../constants/tribe";
import { createHexId } from "../map/hexGrid/utils/createHexId";
import { createBaseUnit } from "./baseUnit";
import { getInitialUnits } from "./utils/getInitialUnits";
import { getStartUnitPositions } from "./utils/getStartPositions";

export const createInitialUnits = (tribes: TTribes[], scene: Scene) => {
  const units = getInitialUnits(tribes);
  const startPositions = getStartUnitPositions(tribes, units);

  startPositions.forEach(({ col, row, unitId }) => {
    const unit = createBaseUnit(scene);

    unit.id = unitId;
    const hexId = createHexId({ col, row });
    const mesh = scene.getMeshById(hexId);

    if (mesh) {
      unit.position.x = mesh.position.x;
      unit.position.z = mesh.position.z;
    }
  });
};
