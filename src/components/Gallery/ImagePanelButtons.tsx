import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';

import { threeToClientCoords } from '@utils/three';

const ImagePanelButtonsLayout = styled.section<{ x: number; y: number }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  transform: translate(-50%, -50%);

  button {
    width: 150px;
    padding: 8px 0;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    color: #000;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
  }
  button:hover {
    background: #7c7bde;
    color: #fff;
  }
`;

interface ImagePanelButtonsProps {
  x: number;
  y: number;
  z: number;
  handleChangeImage: () => void;
  handleDeleteImage: () => void;
}

const ImagePanelButtons = ({
  x,
  y,
  z,
  handleChangeImage,
  handleDeleteImage,
}: ImagePanelButtonsProps) => {
  const camera = useThree((state) => state.camera);

  const { x: centerX, y: centerY } = threeToClientCoords(
    camera,
    new THREE.Vector3(x, y, z)
  );

  return (
    <Html>
      <ImagePanelButtonsLayout x={centerX} y={centerY}>
        <button type="button" onClick={handleChangeImage}>
          Change
        </button>
        <button type="button" onClick={handleDeleteImage}>
          Delete
        </button>
      </ImagePanelButtonsLayout>
    </Html>
  );
};

export default ImagePanelButtons;
