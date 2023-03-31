import * as THREE from 'three';

export const circularPositions = (
  radius: number,
  segments: number
): number[] => {
  const circleGeometry = new THREE.CircleGeometry(radius, segments);
  circleGeometry.rotateX(Math.PI / 2);
  circleGeometry.rotateY(-Math.PI / 2);
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circlePositions = circleEdges.attributes.position.array;

  const positions = [];
  positions.push(circlePositions[0], circlePositions[1], circlePositions[2]);

  for (let i = 3; i < circlePositions.length; i += 3) {
    if ((i / 3) % 2 === 0) {
      positions.push(
        circlePositions[i],
        circlePositions[i + 1],
        circlePositions[i + 2]
      );
    }
  }

  return positions;
};

export const spreadPositions = (length: number) => {
  const positions = [];
  for (let i = 0; i < length; i += 1) {
    positions.push(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 5
    );
  }
  return positions;
};
