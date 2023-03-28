import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type View = 'circular' | 'spread';

export interface GalleryState {
  view: View;
  aspectRatio: { x: number; y: number };
  reverse: boolean;
}

const initialState: GalleryState = {
  view: 'circular',
  aspectRatio: { x: 3, y: 4 },
  reverse: false,
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
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
export const { changeView, changeAspectRatio, toggleReverse } =
  GallerySlice.actions;
