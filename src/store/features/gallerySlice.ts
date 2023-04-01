import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type View = 'circular' | 'spread' | 'grid';

export interface Coord {
  x: number;
  y: number;
  z: number;
}

export interface ViewInfo {
  position: Coord[];
  rotation: Coord[];
}

export interface GalleryState {
  viewsInfo: Record<View, ViewInfo>;
  view: View;
  aspectRatio: { x: number; y: number };
  reverse: boolean;
}

const initialState: GalleryState = {
  viewsInfo: {
    circular: { position: [], rotation: [] },
    spread: { position: [], rotation: [] },
    grid: { position: [], rotation: [] },
  },
  view: 'circular',
  aspectRatio: { x: 3, y: 4 },
  reverse: false,
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setViewInfo: (
      state,
      action: PayloadAction<{
        view: View;
        info: ViewInfo;
      }>
    ) => {
      state.viewsInfo[action.payload.view] = action.payload.info;
    },
    changeView: (state, action: PayloadAction<{ view: View }>) => {
      state.view = action.payload.view;
    },
    changeAspectRatio: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.aspectRatio.x = action.payload.x;
      state.aspectRatio.y = action.payload.y;
    },
    toggleReverse: (state) => {
      state.reverse = !state.reverse;
    },
  },
});

export default GallerySlice.reducer;
export const { setViewInfo, changeView, changeAspectRatio, toggleReverse } =
  GallerySlice.actions;
