import React from 'react'
import '../styles/Content.css'
import {Routes,Route} from "react-router-dom";
import Home from '../page/Home'
import ChangePassword from '../page/ChangePassword'
import AddCar from '../page/AddCar';
import EditCar from '../page/EditCar';
import Login from '../page/auth/Login';
import Registered from '../page/auth/Registered';
import Protected from './protected/Protected';
import CarDetail from '../page/CarDetail';
import MyCarList from '../page/MyCarList';
  
function Content() {
  return (
    <main className='contentMain'>
        <Routes>
            <Route path='/'Component={Home} />
            <Route path='/changepassword' Component={ChangePassword}/>
            <Route path='/addNewCar' Component={AddCar}/>
            <Route path='/mycar' Component={MyCarList}/>

            <Route path='/editCar/:carId' Component={EditCar}/>
            <Route path='/cardetail/:carId' Component={CarDetail}/>
            <Route Component={Protected}>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Registered}/>

            </Route>
       



        </Routes>

        
        
    </main>
  )
}

export default Content