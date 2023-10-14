import { configureStore } from '@reduxjs/toolkit'
import carsSlice from '../carsSlice'
import userSlice from '../userSlice'
import imageSlice from '../imageSlice'

export const store = configureStore({
  reducer: {
    cars:carsSlice,
    user:userSlice,
    images:imageSlice
    

  },
})