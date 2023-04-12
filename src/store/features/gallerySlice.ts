import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import images from '@assets/images';

export type View = 'circular' | 'spread' | 'grid';
export type Mode = 'default' | 'changeImage';

export interface Coord {
  x: number;
  y: number;
  z: number;
}

export interface PointSet {
  position: Coord[];
  rotation: Coord[];
}

export interface GalleryState {
  images: string[];
  viewPointSet: Record<View, PointSet>;
  view: View;
  aspectRatio: { x: number; y: number };
  mode: Mode;
}

const initialState: GalleryState = {
  images,
  viewPointSet: {
    circular: { position: [], rotation: [] },
    spread: { position: [], rotation: [] },
    grid: { position: [], rotation: [] },
  },
  view: 'circular',
  aspectRatio: { x: 3, y: 4 },
  mode: 'default',
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    changeImage: (
      state,
      action: PayloadAction<{ index: number; image: string }>
    ) => {
      state.images[action.payload.index] = action.payload.image;
    },
    setViewPointSet: (
      state,
      action: PayloadAction<{
        view: View;
        pointSet: PointSet;
      }>
    ) => {
      state.viewPointSet[action.payload.view] = action.payload.pointSet;
    },
    setView: (state, action: PayloadAction<{ view: View }>) => {
      state.view = action.payload.view;
    },
    setAspectRatio: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.aspectRatio.x = action.payload.x;
      state.aspectRatio.y = action.payload.y;
    },
    setMode: (state, action: PayloadAction<{ mode: Mode }>) => {
      state.mode = action.payload.mode;
    },
  },
});

export default GallerySlice.reducer;
export const {
  changeImage,
  setViewPointSet,
  setView,
  setAspectRatio,
  setMode,
} = GallerySlice.actions;
