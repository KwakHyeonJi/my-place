import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type View = 'circular' | 'spread' | 'grid';

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
  viewPointSet: Record<View, PointSet>;
  view: View;
  aspectRatio: { x: number; y: number };
}

const initialState: GalleryState = {
  viewPointSet: {
    circular: { position: [], rotation: [] },
    spread: { position: [], rotation: [] },
    grid: { position: [], rotation: [] },
  },
  view: 'circular',
  aspectRatio: { x: 3, y: 4 },
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
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
  },
});

export default GallerySlice.reducer;
export const { setViewPointSet, setView, setAspectRatio } =
  GallerySlice.actions;
