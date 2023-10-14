import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
 

export const getAllCars=createAsyncThunk('cars/getAllCars',async ()=>{
    const data=await axios.get(`/cars`)
    return data.data.data
})

export const getAllByBrand=createAsyncThunk('cars/getAllByBrand',async (brand)=>{
    const data=await axios.get(`/cars?brand=${brand}`)
    return data.data.data
})

export const getAllByModal=createAsyncThunk('cars/getAllByModal',async (modal)=>{
    const data=await axios.get(`/cars?modal=${modal}`)
    return data.data.data
})

export const getAllByModalAndByBrand=createAsyncThunk('cars/getAllByModalAndByBrand',async (modalAndBrand)=>{
    const data=await axios.get(`/cars?brand=${modalAndBrand.brand}&modal=${modalAndBrand.modal}`)
    return data.data.data
})

export const getByCarIdCars=createAsyncThunk('cars/getByCarIdCars',async (carsId)=>{
    const data=await axios.get(`/cars/${carsId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})


export const fetchCarByCarId=async(carsId)=>{
    const data=await axios.get(`/cars/${carsId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
}

export const getByCarsUserId=createAsyncThunk('cars/getByCarsUserId',async (userId)=>{
    const data=await axios.get(`/cars?userId=${userId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})

export const addOneCar=createAsyncThunk('cars/addOneCar',async (car)=>{
    const data=await axios.post(`/cars`,car,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})
export const deleteOneCar=createAsyncThunk('cars/deleteOneCar',async (carId)=>{
    const data=await axios.delete(`/cars/${carId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})  


export const updateOneCar=createAsyncThunk('cars/updateOneCar',async (update)=>{
    const updateObj={carName:update.carName,modal:update.modal,brand:update.brand,year:update.year,plate:update.plate}
    const data=await axios.put(`/cars/${update.id}`,updateObj,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    
    return data.data.data
  
})






//AUTH ---> REGİSTER AND LOGİN
export const registerAuth=createAsyncThunk('auth/registerAuth',async (register)=>{

    const data=await axios.post(`/auth/register`,register)
    return data.data
})

export const loginAuth=createAsyncThunk('auth/loginAuth',async (login)=>{
    const data=await axios.post(`/auth/login`,login)
    localStorage.setItem("token",data.data.message)
    localStorage.setItem("currentUserId",data.data.userId)
    localStorage.setItem("currentUserName",data.data.userName)
    return data.data
})
//

export const getImagesByCarId=createAsyncThunk('cars/getImagesByCarId',async (carId)=>{
    const data=await axios.get(`/images?carId=${carId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})

export const addImages=createAsyncThunk('cars/getImagesByCarId',async (image)=>{
    const data=await axios.post(`/images`,image,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
})


//change password user
export const changePassword=createAsyncThunk('cars/changePassword',async (newPassword)=>{
    const data=await axios.put(`/users/${parseInt(localStorage.getItem("currentUserId"))}`,newPassword,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    
    return data.data
})

