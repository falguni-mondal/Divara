import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import AuthGuard from '../guards/AuthGuard'
import PublicOnly from '../guards/PublicOnly'
import Account from '../pages/Account'
import EmailVerification from '../pages/email_verification/EmailVerification'
import Profile from '../pages/Profile'

const PageRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />

      {/* PUBLIC ROUTES */}
      <Route element={<PublicOnly />}>
        {/* Auth Page */}
        <Route path='/account/*' element={<Account />} />
      </Route>

      {/* USER ROUTES */}
      <Route element={<AuthGuard />}>
        {/* Profile Page */}
        <Route path='/profile' element={<Profile />} />
      </Route>

        {/* Verification Page */}
        <Route path='/account/verify' element={<EmailVerification />}/>
        
    </Routes>
  )
}

export default PageRouter