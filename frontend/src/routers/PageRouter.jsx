import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import AuthGuard from '../guards/AuthGuard';
import PublicOnly from '../guards/PublicOnly';
import Account from '../pages/Account';
import EmailVerification from '../pages/email_verification/EmailVerification';
import VerifyEmail from '../pages/email_verification/VerifyEmail';
import Profile from '../pages/Profile';
import UpdatedEmailVerify from '../components/profile/edit/UpdatedEmailVerify';
import AdminGuard from '../guards/AdminGuard';
import Admin from '../pages/Admin';

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
        <Route path='/profile/*' element={<Profile />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<AdminGuard />}>
        {/* Admin Page */}
        <Route path='/admin/*' element={<Admin />} />
      </Route>

      {/* Verification Page */}
      <Route path='/user/verify' element={<EmailVerification />} />
      <Route path='/user/email/verify/token' element={<VerifyEmail />} />
      <Route path='/user/email/update/token' element={<UpdatedEmailVerify />} />


    </Routes>
  )
}

export default PageRouter