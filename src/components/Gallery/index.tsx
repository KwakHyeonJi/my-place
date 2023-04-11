import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

import ChangeView from '@components/Gallery/ChangeView';
import GalleryView from '@components/Gallery/GalleryView';
import Setting from '@components/Gallery/Setting';

const GalleryLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const Gallery = () => {
  return (
    <GalleryLayout>
      <Canvas>
        <ambientLight />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
        />
        <GalleryView />
      </Canvas>
      <ChangeView />
      <Setting />
    </GalleryLayout>
  );
};

export default Gallery;
