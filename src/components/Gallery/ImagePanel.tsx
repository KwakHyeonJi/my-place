import { useTexture } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  type: string;
  x: number;
  y: number;
  z: number;
}

const ImagePanel = ({ geometry, imageSrc, type, x, y, z }: ImagePanelProps) => {
  const ref = useRef<MeshProps & THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const variants = {
    typeA: {
      x,
      y,
      z,
    },
    typeB: {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 5,
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
      position={[x, y, z]}
      variants={variants}
      animate={type}
      transition={{
        duration: 0.8,
      }}
    >
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </motion.mesh>
  );
};

export default ImagePanel;
