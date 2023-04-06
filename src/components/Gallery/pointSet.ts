import * as THREE from 'three';

import { PointSet } from '@store/features/gallerySlice';

const circularPointSet = (length: number, radius: number): PointSet => {
  const info: PointSet = { position: [], rotation: [] };
  const object = new THREE.Object3D();

  const theta = (2 * Math.PI) / length;
  const thetaStart = Math.PI / 2;

  for (let i = 0; i < length; i += 1) {
    object.position.set(
      radius * Math.cos(theta * i + thetaStart),
      0,
      radius * Math.sin(theta * i + thetaStart)
    );
    object.lookAt(0, 0, 0);
    info.position.push({
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    });
    info.rotation.push({
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z,
    });
  }

  return info;
};

const spreadPointSet = (
  length: number,
  x: number,
  y: number,
  z: number
): PointSet => {
  const info: PointSet = { position: [], rotation: [] };

  for (let i = 0; i < length; i += 1) {
    info.position.push({
      x: (Math.random() - 0.5) * x,
      y: (Math.random() - 0.5) * y,
      z: (Math.random() - 0.5) * z,
    });
    info.rotation.push({
      x: 0,
      y: Math.PI,
      z: 0,
    });
  }

  return info;
};

export { circularPointSet, spreadPointSet };
