import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ViewValue, ModeValue, VIEWS, MODES } from '@constants/gallery';

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
  viewPointSet: Record<ViewValue, PointSet>;
  view: ViewValue;
  aspectRatio: { x: number; y: number };
  mode: ModeValue;
}

const initialState: GalleryState = {
  images: [],
  viewPointSet: {
    circular: { position: [], rotation: [] },
    spread: { position: [], rotation: [] },
    grid: { position: [], rotation: [] },
  },
  view: VIEWS.CIRCULAR,
  aspectRatio: { x: 3, y: 4 },
  mode: MODES.DEFAULT,
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.images = action.payload.images;
    },
    changeImage: (
      state,
      action: PayloadAction<{ index: number; image: string }>
    ) => {
      state.images[action.payload.index] = action.payload.image;
    },
    setViewPointSet: (
      state,
      action: PayloadAction<{
        view: ViewValue;
        pointSet: PointSet;
      }>
    ) => {
      state.viewPointSet[action.payload.view] = action.payload.pointSet;
    },
    setView: (state, action: PayloadAction<{ view: ViewValue }>) => {
      state.view = action.payload.view;
    },
    setAspectRatio: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.aspectRatio.x = action.payload.x;
      state.aspectRatio.y = action.payload.y;
    },
    setMode: (state, action: PayloadAction<{ mode: ModeValue }>) => {
      state.mode = action.payload.mode;
    },
  },
});

export default GallerySlice.reducer;
export const {
  setImages,
  changeImage,
  setViewPointSet,
  setView,
  setAspectRatio,
  setMode,
} = GallerySlice.actions;
