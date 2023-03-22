import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';

import images from '@assets/images';
import ImagePanel from '@components/Gallery/ImagePanel';

const GalleryLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const Gallery = () => {
  const SIZE = images.length;
  const planeGeometry = new THREE.PlaneGeometry(1, 1.5);

  const circleGeometry = new THREE.CircleGeometry(2.5, SIZE);
  circleGeometry.rotateX(Math.PI / 2);
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circlePositions = circleEdges.attributes.position.array;

  const positions = [
    { x: circlePositions[0], y: circlePositions[1], z: circlePositions[2] },
  ];
  for (let i = 3; i < circlePositions.length; i += 3) {
    if ((i / 3) % 2 === 0) {
      positions.push({
        x: circlePositions[i],
        y: circlePositions[i + 1],
        z: circlePositions[i + 2],
      });
    }
  }

  const randomPositions = [];
  for (let i = 0; i < positions.length; i += 1) {
    randomPositions.push((Math.random() - 0.5) * 10);
  }

  return (
    <GalleryLayout>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        {Array(SIZE)
          .fill(undefined)
          .map((_, i) => (
            <ImagePanel
              key={images[i]}
              geometry={planeGeometry}
              imageSrc={images[i]}
              x={positions[i].x}
              y={positions[i].y}
              z={positions[i].z}
            />
          ))}
      </Canvas>
    </GalleryLayout>
  );
};

export default Gallery;
