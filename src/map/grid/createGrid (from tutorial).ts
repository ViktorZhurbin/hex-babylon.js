import {
  ArcRotateCamera,
  NodeMaterial,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";

// Initially copied from: https://youtu.be/xOw31J8JFqA?t=76
// Reference: https://www.redblobgames.com/grids/hexagons/

//The math and properties for creating the hex grid.
const gridSize = 2;
const hexLength = 1;
const hexWidthDistance = Math.sqrt(3) * hexLength;
const hexHeightDistance = 2 * hexLength;
let rowlengthAddition = 0;

export const createHexGrid = async (camera: ArcRotateCamera, scene: Scene) => {
  //load an asset container for the hex tile
  const hexTileImport = await SceneLoader.LoadAssetContainerAsync(
    "https://assets.babylonjs.com/meshes/",
    "hexTile.glb",
    scene,
  );

  //Create and load a node material for the top water surface.
  const waterMaterialTop = await NodeMaterial.ParseFromSnippetAsync(
    "TD23TV#21",
    scene,
  );
  waterMaterialTop.name = "waterMaterialTop";

  const gridStart = new Vector3(
    (hexWidthDistance / 2) * (gridSize - 1),
    0,
    -hexHeightDistance * 0.75 * (gridSize - 1),
  );

  for (let i = 0; i < gridSize * 2 - 1; i++) {
    for (let y = 0; y < gridSize + rowlengthAddition; y++) {
      const hexTile = hexTileImport.instantiateModelsToScene();
      const hexTileRoot = hexTile.rootNodes[0];
      hexTileRoot.name = "hexTile" + i + y;
      // @ts-expect-error adad
      hexTileRoot.position.copyFrom(gridStart);
      // @ts-expect-error adad
      hexTileRoot.position.x -= hexWidthDistance * y;

      const hexChildren = hexTileRoot.getDescendants();
      for (let k = 0; k < hexChildren.length; k++) {
        hexChildren[k].name = hexChildren[k].name.slice(9);
        if (hexChildren[k].name === "terrain") {
          // @ts-expect-error adad
          hexChildren[k].visibility = 0;
        }
      }

      const hexTileChildMeshes = hexTileRoot.getChildMeshes();
      for (let j = 0; j < hexTileChildMeshes.length; j++) {
        if (hexTileChildMeshes[j].name === "top") {
          hexTileChildMeshes[j].material = waterMaterialTop;
          hexTileChildMeshes[j].hasVertexAlpha = false;
        }
      }

      const hexTileAnimGroup = hexTile.animationGroups[0];
      hexTileAnimGroup.name = "AnimGroup" + hexTileRoot.name;
    }

    if (i >= gridSize - 1) {
      rowlengthAddition -= 1;
      gridStart.x -= hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    } else {
      rowlengthAddition += 1;
      gridStart.x += hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    }
  }

  camera.radius = gridSize * 5;
  camera.upperRadiusLimit = camera.radius + 5;

  const allAnimGroups = scene.animationGroups;
  for (let i = 0; i < allAnimGroups.length; i++) {
    allAnimGroups[i].reset();
  }
};
