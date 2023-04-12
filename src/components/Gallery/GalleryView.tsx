import { MODES, VIEWS } from '@constants/gallery';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import ImagePanel from '@components/Gallery/ImagePanel';
import {
  circularPointSet,
  spreadPointSet,
  gridPointSet,
} from '@components/Gallery/pointSet';
import UploadImage from '@components/Gallery/UploadImage';
import useDrag from '@hooks/useDrag';
import { setViewPointSet } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const GalleryView = () => {
  const IMG_WIDTH = 1.2;

  const groupRef = useRef<THREE.Group | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { images, view, aspectRatio, mode } = useAppSelecter(
    (state) => state.gallery
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const camera = useThree((state) => state.camera);
  const isDragging = useDrag();

  const dispatch = useAppDispatch();

  const planeWidth = IMG_WIDTH;
  const planeHeight = (planeWidth * aspectRatio.y) / aspectRatio.x;
  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  const getSeletedObject = (objects: THREE.Object3D[], e: THREE.Event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    return intersects[0].object.name;
  };

  const handleChangeImage = (e: THREE.Event) => {
    if (
      groupRef.current &&
      inputRef.current &&
      mode === MODES.CHANGE_IMAGE &&
      !isDragging
    ) {
      setSelectedImage(getSeletedObject(groupRef.current.children, e));
      inputRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(
      setViewPointSet({
        view: VIEWS.CIRCULAR,
        pointSet: circularPointSet(images.length, planeWidth),
      })
    );
  }, []);

  useEffect(() => {
    if (view === VIEWS.SPREAD) {
      dispatch(
        setViewPointSet({
          view,
          pointSet: spreadPointSet(images.length, 5, 2, 5),
        })
      );
    }
  }, [view]);

  useEffect(() => {
    if (view === VIEWS.GRID) {
      dispatch(
        setViewPointSet({
          view,
          pointSet: gridPointSet(images.length, 4, planeWidth, planeHeight),
        })
      );
    }
  }, [view, aspectRatio]);

  return (
    <group ref={groupRef} onClick={handleChangeImage}>
      {Array(images.length)
        .fill(undefined)
        .map((_, i) => (
          <ImagePanel
            key={i}
            geometry={planeGeometry}
            imageSrc={images[i]}
            imageIndex={i}
          />
        ))}
      <UploadImage ref={inputRef} selectedImage={Number(selectedImage)} />
    </group>
  );
};

export default GalleryView;
