import * as THREE from 'three';

import { PointSet } from '@store/features/gallerySlice';

const circularPointSet = (length: number, pointWidth: number): PointSet => {
  const GAP = 0.1;
  const pointSet: PointSet = { position: [], rotation: [] };
  const object = new THREE.Object3D();

  const radius = ((pointWidth + GAP) * length) / (2 * Math.PI);
  const theta = (2 * Math.PI) / length;
  const thetaStart = Math.PI / 2;

  for (let i = 0; i < length; i += 1) {
    object.position.set(
      radius * Math.cos(theta * i + thetaStart),
      0,
      radius * Math.sin(theta * i + thetaStart)
    );
    object.lookAt(0, 0, 0);
    object.rotateY(Math.PI);
    pointSet.position.push({
      x: object.position.x,
      y: object.position.y,
      z: object.position.z,
    });
    pointSet.rotation.push({
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z,
    });
  }

  return pointSet;
};

const spreadPointSet = (
  length: number,
  x: number,
  y: number,
  z: number
): PointSet => {
  const pointSet: PointSet = { position: [], rotation: [] };

  for (let i = 0; i < length; i += 1) {
    pointSet.position.push({
      x: (Math.random() - 0.5) * x,
      y: (Math.random() - 0.5) * y,
      z: (Math.random() - 0.5) * z,
    });
    pointSet.rotation.push({
      x: 0,
      y: 0,
      z: 0,
    });
  }

  return pointSet;
};

const gridPointSet = (
  length: number,
  column: number,
  pointWidth: number,
  pointHeight: number
): PointSet => {
  const GAP = 0.1;
  const pointSet: PointSet = { position: [], rotation: [] };

  const startX =
    length < column
      ? ((pointWidth + GAP) * (length - 1)) / 2
      : ((pointWidth + GAP) * (column - 1)) / 2;
  const startY =
    length < column
      ? 0
      : ((pointHeight + GAP) * (Math.ceil(length / column) - 1)) / 2;

  for (let i = 0; i < length; i += 1) {
    pointSet.position.push({
      x: -startX + (i % column) * (pointWidth + GAP),
      y: startY - Math.floor(i / column) * (pointHeight + GAP),
      z: 0,
    });
    pointSet.rotation.push({
      x: 0,
      y: 0,
      z: 0,
    });
  }

  return pointSet;
};

export { circularPointSet, spreadPointSet, gridPointSet };
