import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";

export class GLTFAssetLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.objects = [];
    }

    loadAsset(path, options = {}) {
        const { position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }, rotation = { x: 0, y: 0, z: 0 }, onLoad = null, onError = null } = options;

        this.loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;               
                model.position.set(position.x, position.y, position.z);
                model.scale.set(scale.x, scale.y, scale.z);
                model.rotation.set(rotation.x, rotation.y, rotation.z);
                this.scene.add(model);
                this.objects.push(model);
            },
        );
    }

    getObjects() {
        return this.objects;
    }
}