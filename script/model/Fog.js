import * as THREE from "../../threejs/build/three.module.js";

export class Fog {
    constructor(scene, color = 0xaaaaaa, near = 10, far = 100) {
        this.scene = scene;
        this.color = color;
        this.near = near;
        this.far = far;
        this.initialize();
    }

    initialize = () => {
        this.scene.fog = new THREE.Fog(this.color, this.near, this.far);
    };

    setDensityFog = (density = 0.9) => {
        this.scene.fog = new THREE.FogExp2(this.color, density);
    };

    updateFogColor = (color) => {
        this.color = color;
        if (this.scene.fog) {
            this.scene.fog.color.set(color);
        }
    };

    updateFogRange = (near, far) => {
        if (this.scene.fog instanceof THREE.Fog) {
            this.near = near;
            this.far = far;
            this.scene.fog.near = near;
            this.scene.fog.far = far;
        }
    };

    updateFogDensity = (density) => {
        if (this.scene.fog instanceof THREE.FogExp2) {
            this.scene.fog.density = density;
        }
    };
}