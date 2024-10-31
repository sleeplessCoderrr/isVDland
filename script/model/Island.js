import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

export class Island {
  constructor() {
    this.lighting = new Lighting();
    this.geometry = new Geometry();
    this.objects = [];
    this.materialLoader = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.fontLoader = new FontLoader();
    this.sandMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0x478997),
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.houseMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0xa0522d),
      wireframe: false,
    });
    this.treeMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0x228b22),
      wireframe: false,
    });
  }

  initialize = () => {
    this.#makeIsland(5);
  };

  #makeIsland = (n) => {
    for (let i = 0; i < n; i++) {
      this.#createIsland();
    }
  };

  #createIsland = () => {
    const islandGeometry = this.#generateIslandGeometry();
    const { x, z } = this.#findValidPosition(islandGeometry);

    this.geometry.setPosition(islandGeometry, x, 0, z);
    this.geometry.setRotation(islandGeometry, Math.PI + (Math.random() * 0.1 - 0.05));
    islandGeometry.castShadow = true;
    islandGeometry.receiveShadow = true;

    this.objects.push(islandGeometry);

    this.#addHouse(islandGeometry);
    this.#addTree(islandGeometry);
    this.#addLight(islandGeometry);
  };

  #generateIslandGeometry = () => {
    const baseRadius = Math.random() * 10 + 3;
    const height = Math.random() * 4 + 2;
    const radialSegments = Math.floor(Math.random() * 5 + 15);
    return this.geometry.createCone(baseRadius, height, radialSegments, this.sandMaterial);
  };

  #findValidPosition = (islandGeometry) => {
    let x, z;
    let isTooClose;
    const minDistance = 40;
    const baseRadius = islandGeometry.parameters?.radius || 0;

    do {
      x = (Math.random() - 0.5) * 100;
      z = (Math.random() - 0.5) * 100;

      isTooClose = this.objects.some((obj) => {
        const dx = obj.position.x - x;
        const dz = obj.position.z - z;
        return Math.sqrt(dx * dx + dz * dz) < minDistance + baseRadius;
      });
    } while (isTooClose);

    return { x, z };
  };

  #addHouse = (island) => {
    const house = this.geometry.createBox(2, 4, 2, this.houseMaterial); 
    house.position.set(island.position.x, island.position.y + 1.5, island.position.z); 
    house.castShadow = true;
    this.objects.push(house);
  };

  #addTree = (island) => {
    const trunk = this.geometry.createCylinder(0.2, 0.4, 2, this.treeMaterial); 
    const foliage = this.geometry.createSphere(1, this.treeMaterial); 
    trunk.position.set(island.position.x + 2, island.position.y + 2, island.position.z + 2);
    foliage.position.set(island.position.x + 2, island.position.y + 2.5, island.position.z + 2);
    trunk.castShadow = true;
    foliage.castShadow = true;
    this.objects.push(trunk);
    this.objects.push(foliage);
  };

  #addLight = (island) => {
    const pointLight = this.lighting.createPointLight(0xffffff, 0.7, 10);
    pointLight.position.set(island.position.x, island.position.y + 3, island.position.z);
    pointLight.castShadow = true;
    this.objects.push(pointLight);
  };

  getObjects = () => {
    return this.objects;
  };
}