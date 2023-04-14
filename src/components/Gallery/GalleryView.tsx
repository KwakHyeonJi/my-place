import { useEffect } from 'react';
import * as THREE from 'three';

import sampleImages from '@assets/images';
import ImagePanel from '@components/Gallery/ImagePanel';
import {
  circularPointSet,
  spreadPointSet,
  gridPointSet,
} from '@components/Gallery/pointSet';
import { radios, VIEWS } from '@constants/gallery';
import { setImages, setViewPointSet } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const GalleryView = () => {
  const IMG_WIDTH = 1.2;

  const { images, view, aspectRatio } = useAppSelecter(
    (state) => state.gallery
  );

  const dispatch = useAppDispatch();

  const planeWidth = IMG_WIDTH;
  const planeHeight =
    (planeWidth * radios[aspectRatio][1]) / radios[aspectRatio][0];
  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  useEffect(() => {
    dispatch(setImages({ images: sampleImages }));
  }, []);

  useEffect(() => {
    dispatch(
      setViewPointSet({
        view: VIEWS.CIRCULAR,
        pointSet: circularPointSet(images.length, planeWidth),
      })
    );
  }, [images.length]);

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
  }, [images.length, view, aspectRatio]);

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
