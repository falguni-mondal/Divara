import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Account from '../pages/Account'
import EmailVerification from '../components/auth/email_verification/EmailVerification'

const PageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/account/*' element={<Account />} />
        <Route path='/account/verify' element={<EmailVerification />}/>
    </Routes>
  )
}

export default PageRouter