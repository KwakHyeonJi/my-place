import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type View = 'circular' | 'spread';

export interface Coord {
  x: number;
  y: number;
  z: number;
}

export interface GalleryState {
  positions: Record<View, Coord[]>;
  view: View;
  aspectRatio: { x: number; y: number };
  reverse: boolean;
}

const initialState: GalleryState = {
  positions: { circular: [], spread: [] },
  view: 'circular',
  aspectRatio: { x: 3, y: 4 },
  reverse: false,
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setPositions: (
      state,
      action: PayloadAction<{ view: View; positions: Coord[] }>
    ) => {
      state.positions[action.payload.view] = action.payload.positions;
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
export const { setPositions, changeView, changeAspectRatio, toggleReverse } =
  GallerySlice.actions;
