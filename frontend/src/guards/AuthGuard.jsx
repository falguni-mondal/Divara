import React from 'react'
import { useSelector } from 'react-redux'

const AuthGuard = ({
    children,
    publicOnly= false,
    requireAuth= false,
    requireVerified= false
}) => {

    const {user} = useSelector(state => state.auth);
  return (
    <div>AuthGuard</div>
  )
}

export default AuthGuard