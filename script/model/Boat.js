import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/Component.js";

export class Boat {
    constructor() {
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
        this.materialLoader = new Material();
        this.textureLoader = new THREE.TextureLoader();
        this.boatMaterial = this.materialLoader.createStandartMaterial({ 
            color: 0x8B4513, 
            opacity: 1,
            transparent: false 
        });
        this.sailMaterial = this.materialLoader.createStandartMaterial({ 
            color: 0xffffff, 
            opacity: 0.9,
            transparent: true 
        });
    }

    initialize = () => {
        this.#makeBoats(4);
        this.#animateBoats();
    }

    #makeBoats = (n_boat_total) => {
        for (let i = 0; i < n_boat_total; i++) {
            this.#createBoat();
        }
    }

    #createBoat = () => {
        let position;
        let isValidPosition = false;

        while (!isValidPosition) {
            position = {
                x: Math.random() * 80 - 40, 
                y: 0,                        
                z: Math.random() * 80 - 40
            };

            isValidPosition = this.objects.every(obj => {
                const distance = Math.sqrt(
                    Math.pow(obj.position.x - position.x, 2) +
                    Math.pow(obj.position.z - position.z, 2)
                );
                return distance > 20; 
            });
        }

        const boatGroup = new THREE.Group();
        const hullMain = new THREE.BoxGeometry(1.5, 0.2, 3);
        const hullMesh = new THREE.Mesh(hullMain, this.boatMaterial);
        this.geometry.setPosition(hullMesh, position.x, position.y + 0.2, position.z);
        boatGroup.add(hullMesh);

        const frontGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
        const frontMesh = new THREE.Mesh(frontGeometry, this.boatMaterial);
        frontMesh.rotation.z = Math.PI / 2;
        this.geometry.setPosition(frontMesh, position.x - 1, position.y + 0.2, position.z);
        boatGroup.add(frontMesh);

        const backMesh = frontMesh.clone();
        this.geometry.setPosition(backMesh, position.x + 1, position.y + 0.2, position.z);
        boatGroup.add(backMesh);

        const deckGeometry = new THREE.BoxGeometry(1.2, 0.1, 2.5);
        const deckMesh = new THREE.Mesh(deckGeometry, this.boatMaterial);
        this.geometry.setPosition(deckMesh, position.x, position.y + 0.4, position.z);
        boatGroup.add(deckMesh);

        const mastGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
        const mastMesh = new THREE.Mesh(mastGeometry, this.boatMaterial);
        this.geometry.setPosition(mastMesh, position.x, position.y + 1.5, position.z);
        boatGroup.add(mastMesh);

        const sailGeometry = new THREE.PlaneGeometry(1.5, 2);
        const sailMesh = new THREE.Mesh(sailGeometry, this.sailMaterial);
        this.geometry.setPosition(sailMesh, position.x + 0.5, position.y + 2.5, position.z);
        sailMesh.rotation.y = Math.PI / 6; 
        boatGroup.add(sailMesh);

        this.pointLight = new THREE.PointLight(0xfcec03, 1, 5); 
        this.pointLight.position.set(position.x + 0.5, position.y + 2.5, position.z); 
        boatGroup.add(this.pointLight); 

        this.geometry.setPosition(boatGroup, position.x, position.y, position.z);
        boatGroup.userData.target = this.#generateRandomTarget();

        this.objects.push(boatGroup);
    };

    #animateBoats = () => {
        const speed = 0.01;
        const time = performance.now() * 0.001;

        this.objects.forEach((boat) => {
            const target = boat.userData.target;

            const directionX = target.x - boat.position.x;
            const directionZ = target.z - boat.position.z;
            const distance = Math.sqrt(directionX * directionX + directionZ * directionZ);

            if (distance > 1) {
                boat.position.x += (directionX / distance) * speed;
                boat.position.z += (directionZ / distance) * speed;
                boat.position.y = 0.3 + Math.sin((time + boat.id) * 2) * 0.05;
                this.pointLight.position.set(boat.position.x, boat.position.y, boat.position.z)
            } else {
                boat.userData.target = this.#generateRandomTarget();
            }
        });

        requestAnimationFrame(this.#animateBoats);
    };

    #generateRandomTarget = () => {
        const range = 50;
        return {
            x: (Math.random() - 0.5) * range * 2,
            z: (Math.random() - 0.5) * range * 2,
        };
    };

    getObjects = () => {
        return this.objects;
    };
}
