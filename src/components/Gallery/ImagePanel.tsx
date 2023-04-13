import { useTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import * as THREE from 'three';

import ImagePanelButtons from '@components/Gallery/ImagePanelButtons';
import UploadImage from '@components/Gallery/UploadImage';
import { MODES } from '@constants/gallery';
import useButton from '@hooks/useButton';
import { useAppSelecter } from '@store/store';

interface ImagePanelProps {
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  imageIndex: number;
}

const ImagePanel = ({ geometry, imageSrc, imageIndex }: ImagePanelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const view = useAppSelecter((state) => state.gallery.view);
  const pointSet = useAppSelecter((state) => state.gallery.viewPointSet[view]);
  const mode = useAppSelecter((state) => state.gallery.mode);
  const texture = useTexture(imageSrc);
  const { isClicked, handleClick } = useButton(null);

  const x = pointSet.position[imageIndex]?.x;
  const y = pointSet.position[imageIndex]?.y;
  const z = pointSet.position[imageIndex]?.z;

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

  const handleShowButtons = (e: THREE.Event) => {
    if (mode !== MODES.CHANGE_IMAGE) return;
    e.stopPropagation();
    handleClick();
  };

  const handleChangeImage = () => {
    inputRef.current?.click();
  };

  return (
    <group>
      <motion.mesh
        name={String(imageIndex)}
        geometry={geometry}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleShowButtons}
        initial={false}
        animate={{
          x,
          y,
          z,
          rotateX: pointSet.rotation[imageIndex]?.x,
          rotateY: pointSet.rotation[imageIndex]?.y,
          rotateZ: pointSet.rotation[imageIndex]?.z,
          scale: isClicked ? 1.1 : 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </motion.mesh>
      {isClicked && (
        <ImagePanelButtons
          x={x}
          y={y}
          z={z}
          handleChangeImage={handleChangeImage}
        />
      )}
      <UploadImage ref={inputRef} imageIndex={imageIndex} />
    </group>
  );
};

export default ImagePanel;
