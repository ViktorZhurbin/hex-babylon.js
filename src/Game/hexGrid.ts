import {
  ArcRotateCamera,
  Color3,
  CreateCylinder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

const createHexTile = (scene: Scene) => {
  const hexTile = CreateCylinder(
    "hexTileBase",
    {
      diameter: hexHeightDistance * 0.99,
      height: 0.2,
      tessellation: 6,
    },
    scene,
  );

  hexTile.rotation.y = 11;

  const material = new StandardMaterial("material", scene);
  const colorGreen = Color3.FromHexString("#4fc08d");
  material.diffuseColor = colorGreen;
  material.specularColor = colorGreen;
  hexTile.material = material;

  return hexTile;
};

//The math and properties for creating the hex grid.
const gridSize = 2;
const hexLength = 1;
const hexWidthDistance = Math.sqrt(3) * hexLength;
const hexHeightDistance = 2 * hexLength;
let rowLengthAddition = 0;

export const createHexGrid = (camera: ArcRotateCamera, scene: Scene) => {
  const hexTileBase = createHexTile(scene);

  const gridStart = new Vector3(
    (hexWidthDistance / 2) * (gridSize - 1),
    0,
    -hexHeightDistance * 0.75 * (gridSize - 1),
  );

  for (let i = 0; i < gridSize * 2 - 1; i++) {
    for (let y = 0; y < gridSize + rowLengthAddition; y++) {
      const hex = hexTileBase.clone(`hex-${i}-${y}`);

      hex.position.copyFrom(gridStart);
      hex.position.x -= hexWidthDistance * y;
    }

    if (i >= gridSize - 1) {
      rowLengthAddition -= 1;
      gridStart.x -= hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    } else {
      rowLengthAddition += 1;
      gridStart.x += hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    }
  }

  camera.radius = gridSize * 5;
  camera.upperRadiusLimit = camera.radius + 5;
};
