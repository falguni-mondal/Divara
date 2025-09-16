import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
import BaseAuth from '../components/auth/BaseAuth'

const AccountRouter = ({emailChecker, userMail}) => {
  return (
    <Routes>
        <Route path='/' element={<BaseAuth emailChecker={emailChecker}/>}/>
        <Route path='/signin' element={<Signin userMail={userMail} />}/>
        <Route path='/signup' element={<Signup userMail={userMail} />}/>
    </Routes>
  )
}

export default AccountRouter