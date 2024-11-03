import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/Component.js";

export class Light{
    constructor(){
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
    }

    makeLighting = () => {
        this.#createAmbientLight();
        this.#createMoonLight();
        this.#createLighthouseLight();
        this.#createPointLightHouse();
    }

    #createMoonLight = () => {
        const moonLight = this.lighting.createDirectionalLight(0xaaaaaa, 0.3);
        this.geometry.setPosition(moonLight, 10, 20, -15);
        moonLight.castShadow = true;
        this.objects.push(moonLight);
    };

    #createAmbientLight = () => {
        const ambientLight = this.lighting.createAmbientLight(0x222244, 0.2);
        this.geometry.setPosition(ambientLight, 0, 0, 0);
        this.objects.push(ambientLight);
    };

    #createLighthouseLight = () => {    
        const spotlight = new THREE.SpotLight(0xffffff, 1.5, 100, Math.PI / 8, 0.5, 1);
        spotlight.position.set(-0.5, 13, -0.5);
        spotlight.castShadow = true;
        spotlight.target.position.set(10, 0, 100); 
        this.objects.push(spotlight);
    
        const animateLight = () => {
            requestAnimationFrame(animateLight);
        
            const time = Date.now() * 0.0005;
            const x = 20 * Math.sin(time);
            const y = 0;
            const z = 15 * Math.cos(time);
            spotlight.target.position.set(x, y, z);
            spotlight.target.updateMatrixWorld();
        };
    
        animateLight();
    };

    #createPointLightHouse = () => {
        const light = this.lighting.createPointLight(0xfcec03, 2, 5);
        this.geometry.setPosition(light, -1, 13, -1);
        this.objects.push(light);
    }
    

    getObjects = () => {
        return this.objects;
    };
}