import * as THREE from 'three';

import { Coord } from '@store/features/gallerySlice';

export const circularPositions = (
  radius: number,
  segments: number
): Coord[] => {
  const circleGeometry = new THREE.CircleGeometry(radius, segments);
  circleGeometry.rotateX(Math.PI / 2);
  circleGeometry.rotateY(-Math.PI / 2);
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circlePositions = circleEdges.attributes.position.array;

  const positions = [];
  positions.push({
    x: circlePositions[0],
    y: circlePositions[1],
    z: circlePositions[2],
  });

  for (let i = 3; i < circlePositions.length; i += 3) {
    if ((i / 3) % 2 === 0) {
      positions.push({
        x: circlePositions[i],
        y: circlePositions[i + 1],
        z: circlePositions[i + 2],
      });
    }
  }

  return positions;
};

export const spreadPositions = (length: number): Coord[] => {
  const positions = [];
  for (let i = 0; i < length; i += 1) {
    positions.push({
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 5,
    });
  }
  return positions;
};
