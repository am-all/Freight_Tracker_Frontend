import { configureStore } from '@reduxjs/toolkit';
import placeInteractionReducer from '../screen/placeInteraction/placeInteractionSlice';
import vehicleActivityReducer from '../screen/vehicleActivity/vehicleActivitySlice';

export const store = configureStore({
  reducer: {
    vehicleList: placeInteractionReducer,
    locationList:vehicleActivityReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
