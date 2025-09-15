import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Account from '../pages/Account'

const PageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/account/*' element={<Account />} />
    </Routes>
  )
}

export default PageRouter