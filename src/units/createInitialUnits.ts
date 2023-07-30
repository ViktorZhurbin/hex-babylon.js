import { Scene } from "@babylonjs/core";
import { ring } from "honeycomb-grid";

import { TTribes } from "../constants/tribe";
import { state$ } from "../state/state";
import { getGridSide } from "../utils/getGridSide";
import { HexId } from "../utils/hexId";
import { createUnit } from "./createUnit";
import { getInitialUnits } from "./utils/getInitialUnits";
import { moveUnit } from "./utils/moveUnit";

export const createInitialUnits = (tribes: TTribes[], scene: Scene) => {
  const { allUnits, unitsByTribe } = getInitialUnits(tribes);

  state$.units.set(allUnits);
  const grid = state$.grid.get();

  const gridSide = getGridSide(tribes.length);

  const traverser = ring({ center: [0, 0], start: [gridSide - 1, 0] });
  const ringOfHexes = grid.traverse(traverser);

  const units = [...unitsByTribe];
  ringOfHexes.toArray().forEach((hex, hexIndex) => {
    if (!units.length) {
      return;
    }

    if (hexIndex % gridSide === 0) {
      const tribeUnits = units.pop();

      tribeUnits?.forEach((unit, unitIndex) => {
        const unitMesh = createUnit(scene);
        // console.log(hex);
        // if (import.meta.env.DEV) {
        //   addLabelToMesh({
        //     bgColor: "#fff",
        //     mesh: unit,
        //     scene,
        //     text: units[unitId].type,
        //   });
        // }

        unitMesh.id = unit.id;
        const hexId = HexId.fromArray([hex.r, hex.q + unitIndex]);
        const hexMesh = scene.getMeshById(hexId);

        if (hexMesh) {
          moveUnit(unitMesh, hexMesh);
        }
      });
    }
  });
};
