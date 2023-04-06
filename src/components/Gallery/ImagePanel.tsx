import { useTexture } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import * as THREE from 'three';

import { useAppSelecter } from '@store/store';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  imageIndex: number;
}

const ImagePanel = ({ geometry, imageSrc, imageIndex }: ImagePanelProps) => {
  const view = useAppSelecter((state) => state.gallery.view);
  const pointSet = useAppSelecter((state) => state.gallery.viewPointSet[view]);
  const ref = useRef<MeshProps & THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  return (
    <motion.mesh
      ref={ref}
      geometry={geometry}
      initial={false}
      animate={{
        x: pointSet.position[imageIndex].x,
        y: pointSet.position[imageIndex].y,
        z: pointSet.position[imageIndex].z,
        rotateX: pointSet.rotation[imageIndex].x,
        rotateY: pointSet.rotation[imageIndex].y,
        rotateZ: pointSet.rotation[imageIndex].z,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </motion.mesh>
  );
};

export default ImagePanel;
