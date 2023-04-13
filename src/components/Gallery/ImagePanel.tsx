import { useTexture } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import * as THREE from 'three';

import { MODES } from '@constants/gallery';
import { useAppSelecter } from '@store/store';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  imageIndex: number;
}

const ImagePanel = ({ geometry, imageSrc, imageIndex }: ImagePanelProps) => {
  const view = useAppSelecter((state) => state.gallery.view);
  const pointSet = useAppSelecter((state) => state.gallery.viewPointSet[view]);
  const mode = useAppSelecter((state) => state.gallery.mode);
  const ref = useRef<MeshProps & THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const handlePointerOver = (e: THREE.Event) => {
    if (mode !== MODES.CHANGE_IMAGE) return;
    e.stopPropagation();
    e.nativeEvent.target.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: THREE.Event) => {
    if (mode !== MODES.CHANGE_IMAGE) return;
    e.stopPropagation();
    e.nativeEvent.target.style.cursor = 'default';
  };

  return (
    <motion.mesh
      ref={ref}
      name={String(imageIndex)}
      geometry={geometry}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      initial={false}
      animate={{
        x: pointSet.position[imageIndex]?.x,
        y: pointSet.position[imageIndex]?.y,
        z: pointSet.position[imageIndex]?.z,
        rotateX: pointSet.rotation[imageIndex]?.x,
        rotateY: pointSet.rotation[imageIndex]?.y,
        rotateZ: pointSet.rotation[imageIndex]?.z,
      }}
      whileHover={mode === MODES.CHANGE_IMAGE ? { scale: 1.1 } : {}}
      transition={{
        duration: 0.5,
      }}
    >
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </motion.mesh>
  );
};

export default ImagePanel;
