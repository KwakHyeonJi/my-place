import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import images from '@assets/images';
import ImagePanel from '@components/Gallery/ImagePanel';
import {
  circularPointSet,
  spreadPointSet,
  gridPointSet,
} from '@components/Gallery/pointSet';
import useDrag from '@hooks/useDrag';
import { setViewPointSet } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const GalleryView = () => {
  const IMG_WIDTH = 1.2;
  const IMG_MAX_SIZE = 1024 * 1024;

  const [galleryImages, setGalleryImages] = useState<string[]>(images);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isDragging = useDrag();

  const { view, aspectRatio } = useAppSelecter((state) => state.gallery);
  const mode = useAppSelecter((state) => state.gallery.mode);
  const camera = useThree((state) => state.camera);
  const groupRef = useRef<THREE.Group | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
      mode === 'changeImage' &&
      !isDragging
    ) {
      setSelectedImage(getSeletedObject(groupRef.current.children, e));
      inputRef.current.click();
    }
  };

  const handleUploadImage = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;

    const file = target.files[0];
    if (file.size > IMG_MAX_SIZE) {
      alert('1MB 이하의 파일만 업로드 가능합니다.');
      return;
    }
    target.value = '';

    const reader = new FileReader();
    reader.onload = () => {
      const { result } = reader;

      setGalleryImages(
        galleryImages.map((galleryImage, index) =>
          selectedImage === String(index) ? String(result) : galleryImage
        )
      );
      setSelectedImage(null);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(
      setViewPointSet({
        view: 'circular',
        pointSet: circularPointSet(galleryImages.length, planeWidth),
      })
    );
  }, []);

  useEffect(() => {
    if (view === 'spread') {
      dispatch(
        setViewPointSet({
          view: 'spread',
          pointSet: spreadPointSet(galleryImages.length, 5, 2, 5),
        })
      );
    }
  }, [view]);

  useEffect(() => {
    if (view === 'grid') {
      dispatch(
        setViewPointSet({
          view: 'grid',
          pointSet: gridPointSet(
            galleryImages.length,
            4,
            planeWidth,
            planeHeight
          ),
        })
      );
    }
  }, [view, aspectRatio]);

  return (
    <group ref={groupRef} onClick={handleChangeImage}>
      {Array(galleryImages.length)
        .fill(undefined)
        .map((_, i) => (
          <ImagePanel
            key={i}
            geometry={planeGeometry}
            imageSrc={galleryImages[i]}
            imageIndex={i}
          />
        ))}
      <Html>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleUploadImage}
          style={{ display: 'none' }}
        />
      </Html>
    </group>
  );
};

export default GalleryView;
