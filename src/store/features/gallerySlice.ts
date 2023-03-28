import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type View = 'circular' | 'spread';

export interface GalleryState {
  view: View;
  aspectRatio: { x: number; y: number };
}

const initialState: GalleryState = {
  view: 'circular',
  aspectRatio: { x: 1, y: 1.5 },
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<{ view: View }>) => {
      state.view = action.payload.view;
    },
  },
});

export default GallerySlice.reducer;
export const { changeView } = GallerySlice.actions;
