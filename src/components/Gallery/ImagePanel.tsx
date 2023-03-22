import { useTexture } from '@react-three/drei';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  x: number;
  y: number;
  z: number;
}

const ImagePanel = ({ geometry, imageSrc, x, y, z }: ImagePanelProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  useLayoutEffect(() => {
    ref.current?.lookAt(0, 0, 0);
  }, []);

  return (
    <mesh ref={ref} position={[x, y, z]} geometry={geometry}>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default ImagePanel;
