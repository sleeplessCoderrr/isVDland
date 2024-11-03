import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/Component.js";

export class Rain {
    constructor() {
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
        this.materialLoader = new Material();
        this.textureLoader = new THREE.TextureLoader();

        this.rainParticles = new THREE.BufferGeometry();
        this.rainMaterial = this.materialLoader.createPointMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true,
            opacity: 0.5,
        });

        this.particleCount = 10000;
        this.positions = new Float32Array(this.particleCount * 3); 
        this.velocities = new Float32Array(this.particleCount); 

        for (let i = 0; i < this.particleCount; i++) {
            this.positions[i * 3] = Math.random() * 200 - 100;       
            this.positions[i * 3 + 1] = Math.random() * 1000 - 100;         
            this.positions[i * 3 + 2] = Math.random() * 200 - 100;   
            this.velocities[i] = 0;                                 
        }

        this.rainParticles.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    }

    initialize = () => {
        this.#createRain();
        this.#animateRain();
    };

    #createRain = () => {
        const rain = new THREE.Points(this.rainParticles, this.rainMaterial);
        this.geometry.setCastShadow(rain, true);
        this.geometry.setReceiveShadow(rain, true);
        this.objects.push(rain);
    };

    #animateRain = () => {
        for (let i = 0; i < this.particleCount; i++) {
            this.velocities[i] -= 0.1 + Math.random() * 0.01;    
            this.positions[i * 3 + 1] += this.velocities[i];    

            if (this.positions[i * 3 + 1] < 0) {
                this.positions[i * 3 + 1] = 50;  
                this.velocities[i] = 0;          
            }
        }

        this.rainParticles.attributes.position.needsUpdate = true;
        requestAnimationFrame(()=>{
            this.#animateRain();
        });
    };

    getObjects = () => {
        return this.objects;
    };
}