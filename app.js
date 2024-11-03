import { Builder } from "./script/utils/Builder.js";
import { Island } from "./script/model/Island.js";
import { SkyBox } from "./script/model/SkyBox.js";
import { Geometry } from "./script/utils/Component.js";
import { SeaWaves } from "./script/model/SeaWave.js";
import { Light } from "./script/model/Light.js";
import { Boat } from "./script/model/Boat.js";
import { Rain } from "./script/model/Rain.js";
import { Fog } from "./threejs/build/three.module.js";
import { GLTFAssetLoader } from "./script/utils/GLTFAssetLoader.js";
import { FontLoader } from "./threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "./threejs/examples/jsm/geometries/TextGeometry.js";
import * as THREE from "./threejs/build/three.module.js";

class IsVDland {
  constructor() {
    this.island = new Island();
    this.wave = new SeaWaves();
    this.lighting = new Light();
    this.boat = new Boat();
    this.rain = new Rain();
    this.skybox = new SkyBox(200, 200, 200);
    
    this.builder = new Builder();
    this.geometry = new Geometry();
    
    this.objects = [];
    this.scene = this.builder.createScene();
    this.fog = new Fog(this.scene, 0xffffff, 1, 100);
    this.gltfLoader = new GLTFAssetLoader(this.scene);
 
    this.cameras = [];
    this.cameraOrbit = this.builder.createCamera(75, 1000);
    this.staticCamera = this.builder.createCamera(75, 1000);
    this.cameras.push(this.cameraOrbit);

    this.renderer = this.builder.createRenderer();
    this.controls = this.builder.createOrbitControls(this.cameraOrbit, this.renderer.domElement);
    this.controls.autoRotate = false;

    this.staticCamera.position.set(0, 5, 10);
    this.staticCamera.lookAt(0, 0, 0);

    // Raycaster setup
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Event listeners
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("keydown", this.toggleCamera.bind(this));
  }

  setupCamera = () => {
    this.builder.setCameraPosition(this.cameraOrbit, 0, 2, 60);
    this.builder.setCameraLook(this.cameraOrbit, 0, 0, 0);
  };

  create3DText = (text, position) => {
    const loader = new FontLoader();
    loader.load('./path/to/font.typeface.json', (font) => {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.copy(position);
      this.scene.add(textMesh);
    });
  };

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  toggleCamera(event) {
    if (event.code === "Space") {
      if (this.controls.object === this.cameraOrbit) {
        this.controls.object = this.staticCamera;
        this.controls.enabled = false;
      } else {
        this.controls.object = this.cameraOrbit;
        this.controls.enabled = true;
      }
    }
  }

  fill = () => {
    document.body.appendChild(this.renderer.domElement);
    this.island.initialize();
    this.wave.makeWaves();
    this.lighting.makeLighting();
    this.boat.initialize();
    this.rain.initialize();
    this.gltfLoader.loadAsset(
      '../../public/assets/lighthouse/scene.gltf', {
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.2, y: 0.2, z: 0.2 },
    });

    this.objects = this.objects.concat(this.island.getObjects());
    this.objects = this.objects.concat(this.wave.getObjects());
    this.objects = this.objects.concat(this.lighting.getObjects());
    this.objects = this.objects.concat(this.skybox.getSkyBox());
    this.objects = this.objects.concat(this.boat.getObjects());
    this.objects = this.objects.concat(this.rain.getObjects());
    this.objects = this.objects.concat(this.gltfLoader.getObjects());

    this.objects.forEach((object) => {
      this.scene.add(object);
    });

    // Create 3D text
    this.create3DText("Welcome to IsVDland!", new THREE.Vector3(0, 2, 0));
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.setClearColor(0x000022);
    this.renderer.render(this.scene, this.controls.object);

    this.raycaster.setFromCamera(this.mouse, this.controls.object);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      console.log('Intersected:', intersects[0].object);
    }
  };

  updateAllCamera = () => {
    this.cameras.forEach((camera) => {
      this.setCamera(camera, window.innerWidth, window.innerHeight);
    });
  };

  setCamera = (camera, width, height) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  setRenderer = (width, height) => {
    this.renderer.setSize(width, height);
  };
}

const app = new IsVDland();
window.onload = () => {
  app.setupCamera();
  app.fill();
  app.render();
};

window.onresize = () => {
  app.updateAllCamera();
  app.setRenderer(window.innerWidth, window.innerHeight);
};