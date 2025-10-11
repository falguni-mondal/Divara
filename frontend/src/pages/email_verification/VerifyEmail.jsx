import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { emailVerifier } from '../../store/features/user/authSlice';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(emailVerifier(token));
    }
  }, [])
  return (
    <div>EmailVerifier</div>
  )
}

export default VerifyEmail