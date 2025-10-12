import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom'
import { emailVerifier } from '../../store/features/user/authSlice';
import LoadingScreen from '../../utils/loading/LoadingScreen';

import successVideo from "../../assets/videos/success.webm";
import errorVideo from "../../assets/videos/error.webm";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const { status, message, error } = useSelector(state => state.auth.emailVerify);
  const user = useSelector(state => state.auth.user);
  const userStatus = useSelector(state => state.auth.status);

  if (userStatus === "loading" || userStatus === "idle") {
        return <LoadingScreen />
    }
    if (!user) {
        return <Navigate to="/account" replace />
    }
    if (user && user?.isVerified) {
        return <Navigate to="/profile" replace />
    }

  useEffect(() => {
    dispatch(emailVerifier(token));
  }, [])

  if (status === "loading" || status === "idle") {
    return <LoadingScreen />
  }
  if (status === "success") {
    setTimeout(() => {
      window.location.reload();
    }, [3000])
    return (
      <div className='w-[100vw] h-[100dvh] flex flex-col justify-center items-center px-[3vw] gap-5'>
        <video src={successVideo} className='w-[30vw] h-[30vw]' />
        <p className='text-[3.5vw] font-semibold w-full'>{message.message}</p>
      </div>
    )
  }
  if (status === "failed") {
    setTimeout(() => {
      window.location.reload();
    }, [3000])
    return (
      <div className='w-[100vw] h-[100dvh] flex flex-col justify-center items-center px-[3vw] gap-5'>
        <video src={errorVideo} className='w-[30vw] h-[30vw]' />
        <p className='text-[3.5vw] font-semibold w-full'>{error.message}</p>
      </div>
    )
  }
}

export default VerifyEmail