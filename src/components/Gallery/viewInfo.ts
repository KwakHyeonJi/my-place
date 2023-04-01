import * as THREE from 'three';

import { ViewInfo } from '@store/features/gallerySlice';

export const circularInfo = (radius: number, segments: number): ViewInfo => {
  const circleGeometry = new THREE.CircleGeometry(radius, segments);
  circleGeometry.rotateX(Math.PI / 2);
  circleGeometry.rotateY(-Math.PI / 2);
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circlePositions = circleEdges.attributes.position.array;

  const info: ViewInfo = { position: [], rotation: [] };
  const object = new THREE.Object3D();

  const pushObject = (x: number, y: number, z: number) => {
    object.position.set(x, y, z);
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
  };

  pushObject(circlePositions[0], circlePositions[1], circlePositions[2]);

  for (let i = 3; i < circlePositions.length; i += 3) {
    if ((i / 3) % 2 === 0) {
      pushObject(
        circlePositions[i],
        circlePositions[i + 1],
        circlePositions[i + 2]
      );
    }
  }

  return info;
};

export const spreadInfo = (length: number): ViewInfo => {
  const info: ViewInfo = { position: [], rotation: [] };
  const object = new THREE.Object3D();

  for (let i = 0; i < length; i += 1) {
    object.position.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 5
    );
    info.position.push({
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    });
    info.rotation.push({
      x: 0,
      y: Math.PI,
      z: 0,
    });
  }

  return info;
};
