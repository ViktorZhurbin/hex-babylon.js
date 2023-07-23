import { AbstractMesh, NodeMaterial, Scene } from "@babylonjs/core";

export const handleClickHex = (
  scene: Scene,
  mesh: AbstractMesh,
  material: NodeMaterial,
) => {
  const animGroups = scene.animationGroups;

  for (let i = 0; i < animGroups.length; i++) {
    const siblingMeshes = mesh.parent?.getChildMeshes() ?? [];

    if (animGroups[i].targetedAnimations[0].target === mesh.parent) {
      // set bottom mesh material
      for (let j = 0; j < siblingMeshes.length; j++) {
        if (siblingMeshes[j].name === "bottom") {
          siblingMeshes[j].material = material;
        }
      }

      animGroups[i].play();
    }
  }

  //set all meshes in this hex tile to no longer be pickable
  const siblingMeshes = mesh.parent?.getChildMeshes() ?? [];
  for (let i = 0; i < siblingMeshes.length; i++) {
    siblingMeshes[i].isPickable = false;
  }
};

export const setPointerEvents = async (scene: Scene) => {
  const waterMaterialBottom = await NodeMaterial.ParseFromSnippetAsync(
    "BS6C1U#1",
    scene,
  );
  waterMaterialBottom.name = "waterMaterialBottom";

  scene.onPointerDown = (_, pickResult) => {
    if (pickResult.pickedMesh) {
      handleClickHex(scene, pickResult.pickedMesh, waterMaterialBottom);
    }
  };
};
