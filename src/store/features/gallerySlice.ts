import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PointSet } from '@utils/viewPointSet';

export enum VIEWS {
  CIRCULAR = 'circular',
  GRID = 'grid',
}

export enum MODES {
  DEFAULT = 'DEFAULT',
  EDIT = 'EDIT',
}

export interface GalleryState {
  images: string[];
  mode: MODES;
  view: VIEWS;
  viewPointSet: Record<VIEWS, PointSet>;
}

const initialState: GalleryState = {
  images: [],
  viewPointSet: {
    circular: { position: [], rotation: [] },
    grid: { position: [], rotation: [] },
  },
  view: VIEWS.CIRCULAR,
  mode: MODES.DEFAULT,
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<{ mode: MODES }>) => {
      state.mode = action.payload.mode;
    },
    changeView: (state, action: PayloadAction<{ view: VIEWS }>) => {
      state.view = action.payload.view;
    },
    setPoints: (
      state,
      action: PayloadAction<{
        view: VIEWS;
        pointSet: PointSet;
      }>
    ) => {
      state.viewPointSet[action.payload.view] = action.payload.pointSet;
    },
    setImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.images = action.payload.images;
    },
    replaceImage: (
      state,
      action: PayloadAction<{ index: number; image: string }>
    ) => {
      state.images[action.payload.index] = action.payload.image;
    },
    deleteImage: (state, action: PayloadAction<{ index: number }>) => {
      state.images.splice(action.payload.index, 1);
    },
  },
});

export default GallerySlice.reducer;
export const {
  changeMode,
  changeView,
  setPoints,
  setImages,
  replaceImage,
  deleteImage,
} = GallerySlice.actions;
