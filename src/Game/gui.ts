// export const createGui = () => {
//   const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

//   const panel = new GUI.StackPanel();
//   panel.width = "300px";
//   panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
//   panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
//   advancedTexture.addControl(panel);

//   const guiButton = GUI.Button.CreateSimpleButton(
//     "guiButton",
//     "Rebuild Hex Grid: Size 2",
//   );
//   guiButton.width = "300px";
//   guiButton.height = "40px";
//   guiButton.color = "white";
//   guiButton.cornerRadius = 10;
//   guiButton.background = "blue";
//   guiButton.onPointerUpObservable.add(function () {
//     const sceneMeshes = scene.meshes.slice(0);
//     for (const mesh of sceneMeshes) {
//       mesh.dispose();
//     }
//     const sceneTextures = scene.textures.slice(0);
//     for (const texture of sceneTextures) {
//       if (texture.name === "noiseTexture") {
//         texture.dispose();
//       }
//     }
//     createHexGrid(
//       gridSize,
//       hexWidthDistance,
//       hexHeightDistance,
//       rowlengthAddition,
//       hexTileImport,
//       waterMaterialTop,
//       camera,
//       scene,
//     );
//   });

//   const slider = new GUI.Slider();
//   slider.minimum = 1;
//   slider.maximum = 10;
//   slider.value = 2;
//   slider.height = "20px";
//   slider.width = "200px";
//   slider.onValueChangedObservable.add(function (value) {
//     gridSize = Math.round(value);
//     guiButton.textBlock.text = "Rebuild Hex Grid: Size " + gridSize;
//   });
//   panel.addControl(slider);
//   panel.addControl(guiButton);
// };
