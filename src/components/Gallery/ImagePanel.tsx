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
  const viewsInfo = useAppSelecter((state) => state.gallery.viewsInfo);
  const ref = useRef<MeshProps & THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  return (
    <motion.mesh
      ref={ref}
      geometry={geometry}
      initial={false}
      animate={{
        x: viewsInfo[view].position[imageIndex].x,
        y: viewsInfo[view].position[imageIndex].y,
        z: viewsInfo[view].position[imageIndex].z,
        rotateX: viewsInfo[view].rotation[imageIndex].x,
        rotateY: viewsInfo[view].rotation[imageIndex].y,
        rotateZ: viewsInfo[view].rotation[imageIndex].z,
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
