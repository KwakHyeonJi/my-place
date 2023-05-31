import { useEffect } from 'react';
import * as THREE from 'three';

import sampleImages from '@assets/images';
import ImagePanel from '@components/Gallery/ImagePanel';
import { VIEWS, setImages, setPoints } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

import { ViewPointSet } from '../../utils/viewPointSet';

const IMG_WIDTH = 1.2;
const IMG_HEIGHT = IMG_WIDTH * Math.sqrt(2);
const IMG_GAP = 0.1;
const IMG_COLUMN = 4;

const GalleryView = () => {
  const planeGeometry = new THREE.PlaneGeometry(IMG_WIDTH, IMG_HEIGHT);

  const images = useAppSelecter((state) => state.gallery.images);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setImages({ images: sampleImages }));
  }, [dispatch]);

  useEffect(() => {
    const viewPointSet = new ViewPointSet(IMG_WIDTH, IMG_HEIGHT, IMG_GAP);

    dispatch(
      setPoints({
        view: VIEWS.CIRCULAR,
        pointSet: viewPointSet.circular(images.length),
      })
    );
    dispatch(
      setPoints({
        view: VIEWS.GRID,
        pointSet: viewPointSet.grid(images.length, IMG_COLUMN),
      })
    );
  }, [dispatch, images.length]);

  return (
    <group>
      {images.map((image, index) => (
        <ImagePanel
          key={index}
          geometry={planeGeometry}
          imageSrc={image}
          imageIndex={index}
        />
      ))}
    </group>
  );
};

export default GalleryView;
