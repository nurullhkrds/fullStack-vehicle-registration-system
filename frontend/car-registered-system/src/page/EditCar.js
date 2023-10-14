import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { validationsAddNewCar } from "../components/validation/Validation";
import { fetchCarByCarId, updateOneCar } from "../service";
import { useQuery } from "@tanstack/react-query";

const brand = [
  "BMW",
  "Mercedes",
  "Honda",
  "Audi",
  "Toyota",
  "Volswagen",
  "Volvo",
];
const modelBrand = [
  [
    "525 X drive Sedan",
    "320 X drive Sedan",
    "X5 jeep",
    "116i hatchback",
    "M8 Coupe",
  ],

  ["S600", "E600", "maybach 4 Matic", "CLA AMG A100", "GLA jeep"],

  ["honda civic", "honda accord", "honda City", "honda HR-V", "honda CR-V"],

  [
    "Audi A1 Sportback",
    "Audi Q5",
    "Audi A7 Sportback",
    "Audi A4 Allroad",
    "Audi TTC ",
  ],

  ["Corolla", "C-HR", "RAV4", "Auris", "Yaris"],

  ["Polo", "Golf", "T-Roc", "Tiguan", "Caddy", "Transporter"],

  ["S60", "S40", "XC60", "S90", "XC90"],
];

function EditCar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {carId}=useParams();

  const { isLoading, error, data }= useQuery({ queryKey: ['editCar'], queryFn:()=> fetchCarByCarId(carId) })

  const handleCancel=()=>{
    navigate("/")
  }

 
  const handleSubmit = async(values,bag) => {
    console.log(values.carName);
    navigate("/")
    navigate(0)
    await dispatch(updateOneCar({carName:values.carName,brand:values.brand,year:values.year,plate:values.plaka,modal:values.model,id:carId}))
    
   

  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       
      <section style={{ fontSize: "40px", marginRight: "850px", marginTop: "15px" }}>
        <h3
          style={{ fontSize: "40px"}}
        >
          Kayıt Düzenleme  {carId}
        </h3>
      </section>
      <Formik
        initialValues={{
          carName: data?data.carName:"",
          plaka:data? data.plate:"",
          brand:data? data.brand:"",
          model:data? data.modal:"",
          year: data?data.year:"",
        }}
        validationSchema={validationsAddNewCar}
        onSubmit={handleSubmit}
      >
         {({
          handleSubmit,
          handleBlur,
          handleChange,
          touched,
          errors,
          values,
        }) => (
          <section style={{ width: "650px" }}>
          <form
            style={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Car Name</strong>
              </InputLabel>
              <Input
                placeholder="Araç adını giriniz..."
                style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
                name="carName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.carName}
              />
              {errors.carName && (
                <div
                  style={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {errors.carName}
                </div>
              )}
            </div>
  
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Plaka</strong>
              </InputLabel>
              <Input
                placeholder="Plakayı giriniz..."
                style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
                name="plaka"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.plaka}
              />
              {errors.plaka && (
                <div
                  style={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {errors.plaka}
                </div>
              )}
            </div>
  
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Marka</strong>
              </InputLabel>
              <Select
                placeholder="Markayı giriniz..."
                style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
                name="brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brand.map((brand, key) => {
                  return <MenuItem  value={brand}>{brand}</MenuItem>;
                })}
              </Select>
              {errors.brand && (
                <div
                  style={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {errors.brand}
                </div>
              )}
            </div>
  
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Modal</strong>
              </InputLabel>
              <Select
                placeholder="Modeli giriniz..."
                style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
                name="model"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.model}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
  
                  values.brand ? 
                  modelBrand[brand.findIndex((brand)=>brand===values.brand)].map((model)=>{
                    return(
                      <MenuItem value={model}>{model}</MenuItem>
                    )
                  }) : ""
                }
             
              
  
               
              </Select>
              {errors.model && (
                <div
                  style={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {errors.model}
                </div>
              )}
            </div>
  
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Year</strong>
              </InputLabel>
              <Input
                placeholder="Yılı giriniz..."
                style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
              />
              {errors.year && (
                <div
                  style={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {errors.year}
                </div>
              )}
            </div>
  
            <div style={{ marginTop: "10px", textAlign: "end", width: "500px" }}>
          
             
              <Button
                onClick={handleCancel}
                variant="text"
                style={{
                 
                  marginRight:"15px"
                  
                }}
              >
                Cancel
              </Button>
           
              <Button
                onClick={handleSubmit}
                variant="contained"
                style={{
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
              >
                Save
              </Button>
      
            </div>
          </form>
        </section>
        )}


      </Formik>
     
    </div>
  );
}

export default EditCar;
