import * as THREE from "../../threejs/build/three.module.js";

export class Lighting {
  createAmbientLight = (color, intensity) => {
    return new THREE.AmbientLight(color, intensity);
  };

  createDirectionalLight = (color, intensity) => {
    return new THREE.DirectionalLight(color, intensity);
  };

  createSpotLight = (color, intensity, distance, angle) => {
    return new THREE.SpotLight(color, intensity, distance, angle);
  };

  createPointLight = (color, intensity, distance) => {
    return new THREE.PointLight(color, intensity, distance);
  };
}

export class Material {
  createMeshBasicMaterial = (settings) => {
    return new THREE.MeshBasicMaterial(settings);
  };

  createStandartMaterial = (settings) => {
    return new THREE.MeshStandardMaterial(settings);
  };

  createLambertMaterial = (settings) => {
    return new THREE.MeshLambertMaterial(settings);
  };

  createPhongMaterial = (settings) => {
    return new THREE.MeshPhongMaterial(settings);
  };

  createPointMaterial = (settings) => {
    return new THREE.PointsMaterial(settings);
  };
}

export class Geometry {
  createPoint = (particle, material) => {
    return new THREE.Points(particle, material);
  }

  createBox = (width, height, depth, material) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    return new THREE.Mesh(geometry, material);
  };

  createCone = (radius, height, radialSegments, material) => {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    return new THREE.Mesh(geometry, material);
  };

  createSphere = (radius, material) => {
    const geometry = new THREE.SphereGeometry(radius);
    return new THREE.Mesh(geometry, material);
  };

  createCylinder = (radiusTop, radiusBottom, height, material) => {
    const geometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height
    );
    return new THREE.Mesh(geometry, material);
  };

  createVector3 = (x, y, z) => {
    return new THREE.Vector3(x, y, z)
  }

  createPlane = (width, height, widthSegments, heightSegments, material) => {
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    return new THREE.Mesh(geometry, material);
  };
  
  setPosition = (instance, x, y, z) => {
    instance.position.set(x, y, z);
  };

  setRotation = (instance, rotation) => {
    instance.rotation.x = rotation;
  };

  setCastShadow = (instance, isCast) => {
    instance.castShadow = isCast;
  }

  setReceiveShadow = (instance, isCast) => {
    instance.receiveShadow = isCast;
  }
}

