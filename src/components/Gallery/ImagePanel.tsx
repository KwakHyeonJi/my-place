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
      x: circular[imageIndex * 3],
      y: circular[imageIndex * 3 + 1],
      z: circular[imageIndex * 3 + 2],
    },
    spread: {
      x: spread[imageIndex * 3],
      y: spread[imageIndex * 3 + 1],
      z: spread[imageIndex * 3 + 2],
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
