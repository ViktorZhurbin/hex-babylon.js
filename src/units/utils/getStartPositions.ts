import { SIDE_LENGTH_PER_TRIBE } from "../../constants/grid";
import { TTribes } from "../../constants/tribe";
import { getGridSide } from "../../utils/generateGrid";
import { getInitialUnits } from "./getInitialUnits";

const getStartPositions = (tribesCount: number) => {
  const positions = [[1, 1]];

  for (let index = 0; index < tribesCount - 1; index++) {
    const [prevRow, prevCol] = positions[index];
    const gridSide = getGridSide(tribesCount);

    const row = prevRow + gridSide;
    const col = prevCol + SIDE_LENGTH_PER_TRIBE;

    positions.push([row, col]);
  }

  return positions;
};

export const getStartUnitPositions = (
  tribes: TTribes[],
  units: ReturnType<typeof getInitialUnits>,
) => {
  const startPositions = getStartPositions(tribes.length);
  const middleRow = getGridSide(tribes.length);

  return tribes.reduce<{ col: number; row: number; unitId: string }[]>(
    (acc, tribe, index) => {
      const tribeUnitIds = Object.values(units).flatMap((unit) =>
        unit.tribe === tribe ? unit.id : [],
      );

      const [startRow, startCol] = startPositions[index];

      tribeUnitIds.forEach((unitId, index) => {
        const isGrowng = startRow < middleRow;
        const offsetX = isGrowng ? index * 1 : index * -1;

        acc.push({
          col: startCol + offsetX,
          row: startRow,
          unitId,
        });
      });

      return acc;
    },
    [],
  );
};
