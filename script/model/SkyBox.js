import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/Component.js";

export class SkyBox {
  constructor(height, width, depth) {
    this.boxGeometry = new THREE.BoxGeometry(height, width, depth);
    this.material = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.skyBoxMaterials = [];
    this.skyList = [
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Right.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Left.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Top.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Bottom.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Front.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Back.bmp",
    ];
    this.createSkyBox();
    this.skyBoxMesh = new THREE.Mesh(this.boxGeometry, this.skyBoxMaterials);
  }

  createSkyBox = () => {
    this.skyList.forEach((texturePath) => {
      const texture = this.textureLoader.load(texturePath, (loadedTexture) => {
        loadedTexture.encoding = THREE.sRGBEncoding;
        loadedTexture.needsUpdate = true;
        loadedTexture.repeat.set(1, 1);
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
      });

      const material = this.material.createMeshBasicMaterial({
        color: 0x1111111, 
        map: texture,
        side: THREE.BackSide,
      });
      this.skyBoxMaterials.push(material);
    });

    return new THREE.Mesh(this.boxGeometry, this.skyBoxMaterials);
  };

  getSkyBox = () => {
    return this.skyBoxMesh;
  };
}
