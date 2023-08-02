import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { KeyboardEventTypes } from "@babylonjs/core/Events/keyboardEvents";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Tools } from "@babylonjs/core/Misc/tools";
import { Scene } from "@babylonjs/core/scene";

const movementSpeed = 2;
const BOX_Y = 0.5;

export const initCamera = (scene: Scene) => {
  const cameraRig = new TransformNode("cameraRig");
  const box = cameraRig; //CreateBox("box");
  box.position = new Vector3(0, BOX_Y, 0);

  const camera = new UniversalCamera(
    "UniversalCamera",
    new Vector3(0, 8, -5),
    scene,
  );

  camera.attachControl();
  camera.speed = movementSpeed;

  camera.parent = box;
  // camera.updateUpVectorFromRotation = true;
  camera.rotation = new Vector3(Tools.ToRadians(40), 0, 0);

  // const w = 87;
  // const s = 83;
  // const d = 68;
  // const a = 65;

  // camera.keysUpward.push(w);
  // camera.keysDownward.push(s);
  // camera.keysRight.push(d);
  // camera.keysLeft.push(a);

  let newPosition = 0;
  scene.onKeyboardObservable.add((kbInfo) => {
    if (kbInfo.type === KeyboardEventTypes.KEYDOWN) {
      switch (kbInfo.event.code) {
        case "KeyA":
        case "KeyS":
          newPosition -= movementSpeed;
          break;
        case "KeyW":
        case "KeyD":
          newPosition += movementSpeed;
          break;
      }

      let newVector = Vector3.Zero();
      switch (kbInfo.event.code) {
        case "KeyD":
        case "KeyA":
          newVector = new Vector3(newPosition, BOX_Y, 0);
          break;

        case "KeyW":
        case "KeyS":
          newVector = new Vector3(0, BOX_Y, newPosition);
          break;
      }

      // https://www.youtube.com/watch?v=rnqF6S7PfFA
      box.position = Vector3.Lerp(
        box.position,
        newVector,
        scene.deltaTime / 1000,
      );
    } else if (kbInfo.type === KeyboardEventTypes.KEYUP) {
      newPosition = 0;
    }
  });

  return camera;
};
