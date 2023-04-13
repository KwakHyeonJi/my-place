import * as THREE from 'three';

const threeToClientCoords = (camera: THREE.Camera, vector: THREE.Vector3) => {
  const clientVector = vector.project(camera);
  clientVector.x = (window.innerWidth * clientVector.x) / 2;
  clientVector.y = (-window.innerHeight * clientVector.y) / 2;

  return { x: clientVector.x, y: clientVector.y };
};

export { threeToClientCoords };
