import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/Component.js";

export class SeaWaves{
    constructor(){
        this.geometry = new Geometry();
        this.objects = [];
        this.materialLoader = new Material();
        this.textureLoader = new THREE.TextureLoader();
        this.waterMaterial = this.materialLoader.createPhongMaterial({ 
            color: 0x1e90ff, 
            transparent: true, 
            opacity: 0.1,
            shininess: 100,
            reflectivity: 1 
        });
    }

    makeWaves = () => {
        this.#createSeaWaves();
        this.#animateSeaWaves();
    }

    #createSeaWaves = () => {
        const seaGeometry = this.geometry.createPlane(200, 200, 50, 50, this.waterMaterial);
        this.geometry.setRotation(seaGeometry, -Math.PI / 2);
        seaGeometry.position.y = 0.5;
        seaGeometry.receiveShadow = true;
        this.objects.push(seaGeometry);
        this.seaGeometry = seaGeometry;
        this.geometry.setReceiveShadow(seaGeometry, true);
    };

    #animateSeaWaves = () => {
        const positionAttribute = this.seaGeometry.geometry.attributes.position;
        const vertexCount = positionAttribute.count;
        for (let i = 0; i < vertexCount; i++) {
            const newZ = Math.sin(i + performance.now() * 0.002) * 0.9;
            positionAttribute.setZ(i, newZ);
        }
        positionAttribute.needsUpdate = true;
        requestAnimationFrame(() => {
            this.#animateSeaWaves()
        });
    };

    getObjects = () => {
        return this.objects;
    };
}