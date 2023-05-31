import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

import ChangeView from '@components/Gallery/ChangeView';
import EditModeButton from '@components/Gallery/EditModeButton';
import GalleryView from '@components/Gallery/GalleryView';
import { MODES } from '@store/features/gallerySlice';
import { useAppSelecter } from '@store/store';

const GalleryLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const Gallery = () => {
  const mode = useAppSelecter((state) => state.gallery.mode);
  return (
    <GalleryLayout>
      <Canvas>
        {mode === MODES.DEFAULT && (
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
          />
        )}
        <GalleryView />
      </Canvas>
      <ChangeView />
      <EditModeButton />
    </GalleryLayout>
  );
};

export default Gallery;
