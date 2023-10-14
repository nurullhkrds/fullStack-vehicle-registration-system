import { createSlice } from "@reduxjs/toolkit";
import { addImages, getImagesByCarId } from "../service";

export const imageSlice = createSlice({
  name: "images",
  initialState: {
    //getImageByCarId
    imageCarId:[],
    imageCarIdStatus: "idle",
    imageCarIdError: null,
  },

  extraReducers: {
    //get image by car id
    [getImagesByCarId.pending]: (state, action) => {
      state.imageCarIdStatus = "loading";
    },
    [getImagesByCarId.fulfilled]: (state, action) => {
      state.imageCarId = action.payload;
      state.imageCarIdStatus = "succes";
    },
    [getImagesByCarId.rejected]: (state, action) => {
      state.imageCarIdStatus = "failed";
      state.imageCarIdError = action.error.message;
    },

    //add one image
    [addImages.pending]: (state, action) => {
      state.imageCarIdStatus = "loading";
    },
    [addImages.fulfilled]: (state, action) => {
      state.imageCarId.push(action.payload);
      state.imageCarIdStatus = "succes";
    },
    [addImages.rejected]: (state, action) => {
      state.imageCarIdStatus = "failed";
      state.imageCarIdError = action.error.message;
    },
    


  },
});


export default imageSlice.reducer;
