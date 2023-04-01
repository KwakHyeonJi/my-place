import { useTexture } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

import { useAppSelecter } from '@store/store';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  imageIndex: number;
}

const ImagePanel = ({ geometry, imageSrc, imageIndex }: ImagePanelProps) => {
  const { circular, spread } = useAppSelecter(
    (state) => state.gallery.positions
  );

  const view = useAppSelecter((state) => state.gallery.view);
  const ref = useRef<MeshProps & THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const variants = {
    circular: {
      x: circular[imageIndex].x,
      y: circular[imageIndex].y,
      z: circular[imageIndex].z,
    },
    spread: {
      x: spread[imageIndex]?.x,
      y: spread[imageIndex]?.y,
      z: spread[imageIndex]?.z,
      rotateX: 0,
      rotateY: Math.PI,
      rotateZ: 0,
    },
  };

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (mesh) {
      mesh.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <motion.mesh
      ref={ref}
      geometry={geometry}
      initial={false}
      variants={variants}
      animate={view}
      transition={{
        duration: 0.8,
      }}
    >
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </motion.mesh>
  );
};

export default ImagePanel;
