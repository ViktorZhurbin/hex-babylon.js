export const SIDE_LENGTH_PER_TRIBE = 2;

export const getGridParams = (tribesCount: number) => {
  const GRID_SIDE = tribesCount * SIDE_LENGTH_PER_TRIBE;

  return {
    RowsCount: GRID_SIDE * 2 - 1,
    SideLength: GRID_SIDE,
  };
};
