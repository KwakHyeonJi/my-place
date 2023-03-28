import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux/es/types';

import { GallerySlice } from '@store/features/gallerySlice';

export const store = configureStore({
  reducer: {
    gallery: GallerySlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelecter: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
