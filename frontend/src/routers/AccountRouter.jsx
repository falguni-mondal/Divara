import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import BaseAuth from '../components/auth/BaseAuth';

const AccountRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<BaseAuth/>}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/signup' element={<Signup />}/>
    </Routes>
  )
}

export default AccountRouter