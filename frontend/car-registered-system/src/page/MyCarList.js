import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getByCarsUserId } from '../service';
import MyCar from '../components/MyCar';

function MyCarList() {
    const dispatch = useDispatch();
    const myCars = useSelector((state) => state.cars.carsByUserId);
    const myCarsStatus = useSelector((state) => state.cars.carsByUserIdStatus);

    useEffect(() => {
        if (myCarsStatus === "idle") {
          getCars();
        }
      }, [myCars, myCarsStatus]);
    
      const getCars = async () => {
        await dispatch(
          getByCarsUserId(parseInt(localStorage.getItem("currentUserId")))
        );
      };
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div style={{textAlign:"center",marginTop:"25px"}}><h2>Araçlarım</h2></div>
           
        {
            myCars.length>0?myCars.map((car)=>{
                return(
                    
                    <MyCar key={car.id} car={car} />
                
                )
            }):
            <div style={{fontSize:"22px"}}>Kayıtlı herhangi bir araç bulunmamakta...</div>
        }

    </div>
  )
}

export default MyCarList