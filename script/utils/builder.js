import * as THREE from "../../threejs/build/three.module.js";
import { OrbitControls } from "../../threejs/examples/jsm/controls/OrbitControls.js";

export class Builder {
  createCamera = (fov, far) => {
    return new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      far
    );
  };

  createOrbitControls = (camera, rendererDomElement) => {
    return new OrbitControls(camera, rendererDomElement);
  };

  setCameraPosition = (camera, x, y, z) => {
    camera.position.set(x, y, z);
  };

  setCameraLook(camera, x, y, z) {
    camera.lookAt(x, y, z);
  }

  createScene = () => {
    return new THREE.Scene();
  };

  addScene = (scene, box, items) => {
    scene.add(new THREE.Mesh(box, items));
  };

  createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  };
}

