import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';

import images from '@assets/images';
import ChangeRatio from '@components/Gallery/ChangeRatio';
import ChangeView from '@components/Gallery/ChangeView';
import ImagePanel from '@components/Gallery/ImagePanel';
import { useAppSelecter } from '@store/store';

const GalleryLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const SIZE = images.length;

const Gallery = () => {
  const { aspectRatio, reverse } = useAppSelecter((state) => state.gallery);

  const height = reverse
    ? aspectRatio.x / aspectRatio.y
    : aspectRatio.y / aspectRatio.x;

  const planeGeometry = new THREE.PlaneGeometry(1, height);
  planeGeometry.rotateY(Math.PI);

  // circular
  const circleGeometry = new THREE.CircleGeometry(2.5, SIZE);
  circleGeometry.rotateX(Math.PI / 2);
  circleGeometry.rotateY(-Math.PI / 2);
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circlePositions = circleEdges.attributes.position.array;

  const positions: { x: number; y: number; z: number }[] = [];
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

  return (
    <GalleryLayout>
      <Canvas>
        <ambientLight />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
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
      <ChangeView />
      <ChangeRatio />
    </GalleryLayout>
  );
};

export default Gallery;
