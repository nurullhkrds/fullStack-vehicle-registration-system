import { createSlice } from "@reduxjs/toolkit";
import {
  addOneCar,
  deleteOneCar,
  getAllByBrand,
  getAllByModal,
  getAllByModalAndByBrand,
  getAllCars,
  getByCarIdCars,
  getByCarsUserId,
  updateOneCar,
} from "../service";

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    //getAllCar
    carsAll: [],
    carsAllStatus: "idle",
    carsAllError: null,

    carsAllFiltre: [],
    carsAllStatusFiltre: "idle",
    carsAllErrorFiltre: null,

    //getByCarId
    carsByCarId: null,
    carsByCarIdStatus: "idle",
    carsByCarIdError: null,

    //getByUserIdCars
    carsByUserId: [],
    carsByUserIdStatus: "idle",
    carsByUserIdError: null,
  },
  reducers: {
    filteredData:(state,action)=>{
      const data=action.payload;
      if(data!==""){
        const newFiltredData=state.carsAllFiltre.filter((car)=>car.carName.includes(data))
        state.carsAll=newFiltredData;

      }
      else{
        state.carsAll=state.carsAllFiltre;
      }
     
      
    }
  },
  extraReducers: {
    //get full cars
    [getAllCars.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [getAllCars.fulfilled]: (state, action) => {
      state.carsAll = action.payload;
      state.carsAllFiltre=action.payload;
      state.carsAllStatus = "succes";
    },
    [getAllCars.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },

    //getby modal 
    [getAllByModal.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [getAllByModal.fulfilled]: (state, action) => {
      state.carsAll = action.payload;
      state.carsAllFiltre=action.payload;
      state.carsAllStatus = "succes";
    },
    [getAllByModal.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },


    //getby brand

    [getAllByBrand.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [getAllByBrand.fulfilled]: (state, action) => {
      state.carsAll = action.payload;
      state.carsAllFiltre=action.payload;
      state.carsAllStatus = "succes";
    },
    [getAllByBrand.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },


    // get by brand and modal

    [getAllByModalAndByBrand.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [getAllByModalAndByBrand.fulfilled]: (state, action) => {
      state.carsAll = action.payload;
      state.carsAllFiltre=action.payload;
      state.carsAllStatus = "succes";
    },
    [getAllByModalAndByBrand.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },






    //get byCarId car
    [getByCarIdCars.pending]: (state, action) => {
      state.carsByCarIdStatus = "loading";
    },
    [getByCarIdCars.fulfilled]: (state, action) => {
      state.carsByCarId = action.payload;
      state.carsAllStatus = "succes";
    },
    [getByCarIdCars.rejected]: (state, action) => {
      state.carsByCarIdStatus = "failed";
      state.carsByCarIdError = action.error.message;
    },

    //get byUserId cars
    [getByCarsUserId.pending]: (state, action) => {
      state.carsByUserIdStatus = "loading";
    },
    [getByCarsUserId.fulfilled]: (state, action) => {
      state.carsByUserId = action.payload;
      state.carsByUserIdStatus = "succes";
    },
    [getByCarsUserId.rejected]: (state, action) => {
      state.carsByUserIdStatus = "failed";
      state.carsByUserIdError = action.error.message;
    },
    //update car
    [updateOneCar.pending]: (state, action) => {
      state.carsByUserIdStatus = "loading";
    },
    [updateOneCar.fulfilled]: (state, action) => {
      const { id, carName, brand, modal,year,plate } = action.payload;
      const index = state.carsByUserId.findIndex(car => car.id === id);
      state.carsByUserId[index].carName=carName
      state.carsByUserId[index].brand=brand
      state.carsByUserId[index].modal=modal
      state.carsByUserId[index].year=year
      state.carsByUserId[index].plate=plate
      state.carsByUserIdStatus = "succes";
    },
    [updateOneCar.rejected]: (state, action) => {
      state.carsByUserIdStatus = "failed";
      state.carsByUserIdError = action.error.message;
    },




//Deleted car

    [deleteOneCar.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [deleteOneCar.fulfilled]: (state, action) => {
      const id = action.payload;
      const newCars = state.carsByUserId.filter((car) => car.id !== id);
      state.carsByUserId = newCars;
      state.carsAllStatus = "succes";
    },
    [deleteOneCar.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },





    //add cars
    [addOneCar.pending]: (state, action) => {
      state.carsAllStatus = "loading";
    },
    [addOneCar.fulfilled]: (state, action) => {
      state.carsAll.push(action.payload);
      state.carsAllStatus = "succes";
    },
    [addOneCar.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },

    //delete cars
    [deleteOneCar.pending]: (state) => {
      state.carsAllStatus = "loading";
    },
    [deleteOneCar.fulfilled]: (state, action) => {
      const id = action.payload;
      const newCars = state.carsAll.filter((car) => car.id !== id);
      state.carsAll = newCars;
      state.carsAllStatus = "succes";
    },
    [deleteOneCar.rejected]: (state, action) => {
      state.carsAllStatus = "failed";
      state.carsAllError = action.error.message;
    },
  },
});

export const {filteredData} = carsSlice.actions;

export default carsSlice.reducer;
