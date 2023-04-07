import { useEffect } from 'react';
import * as THREE from 'three';

import images from '@assets/images';
import ImagePanel from '@components/Gallery/ImagePanel';
import {
  circularPointSet,
  spreadPointSet,
  gridPointSet,
} from '@components/Gallery/pointSet';
import { setViewPointSet } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const GalleryView = () => {
  const IMG_LENGTH = images.length;
  const IMG_WIDTH = 1.2;
  const GAP_CIRCULAR = 0.1;

  const { view, aspectRatio } = useAppSelecter((state) => state.gallery);
  const dispatch = useAppDispatch();

  const planeWidth = IMG_WIDTH;
  const planeHeight = (planeWidth * aspectRatio.y) / aspectRatio.x;
  const radius = ((IMG_WIDTH + GAP_CIRCULAR) * IMG_LENGTH) / (2 * Math.PI);

  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  useEffect(() => {
    dispatch(
      setViewPointSet({
        view: 'circular',
        pointSet: circularPointSet(IMG_LENGTH, radius),
      })
    );
  }, []);

  useEffect(() => {
    if (view === 'spread') {
      dispatch(
        setViewPointSet({
          view: 'spread',
          pointSet: spreadPointSet(IMG_LENGTH, 5, 2, 5),
        })
      );
    }
  }, [view]);

  useEffect(() => {
    if (view === 'grid') {
      dispatch(
        setViewPointSet({
          view: 'grid',
          pointSet: gridPointSet(IMG_LENGTH, 4, planeWidth, planeHeight),
        })
      );
    }
  }, [view, aspectRatio]);

  return (
    <>
      {Array(IMG_LENGTH)
        .fill(undefined)
        .map((_, i) => (
          <ImagePanel
            key={images[i]}
            geometry={planeGeometry}
            imageSrc={images[i]}
            imageIndex={i}
          />
        ))}
    </>
  );
};

export default GalleryView;
