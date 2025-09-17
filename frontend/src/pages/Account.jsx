import React, { useEffect, useState } from 'react'
import axios from "axios"

import AccountRouter from '../routers/AccountRouter'
import { FcGoogle } from "react-icons/fc";
import { backendBaseApi } from '../configs/keys';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Account = () => {
  const navigate = useNavigate();
  const { hasUser, status } = useSelector((state) => state.auth.checkEmail);

  useEffect(() => {
    if (status === "success") {
      if (hasUser) {
        navigate("/account/signin");
      }
      else {
        navigate("/account/signup");
      }
    }
  }, [hasUser, status])

  return (
    <div className='w-full py-[15vw] px-[10vw]' id='account-page'>
      <div className='w-full' id="account-page-main-container">
        <h1 className="account-page-heading text-[8.5vw] uppercase font-[300] leading-none text-center">
          My Divara Account
        </h1>
        <section className="third-party-signin-section mt-[5vh]">
          <button className='google-signin-btn flex items-center justify-center gap-2 text-[3vw] uppercase font-semibold w-full h-[6vh] border-[1.5px] rounded-[3px]'>
            <FcGoogle className='text-[4.5vw]' />
            Continue with google
          </button>
        </section>
        <span className='block w-full text-center uppercase font-semibold text-[3.5vw] my-[3vh]'>or</span>
        <div className="signin-heading-container">
          <h2 className='text-[6vw] uppercase text-center signin-heading'>Continue with your email address</h2>
          <p className="signin-subheading text-[4vw] text-center mt-[4vh]">
            Sign in with your email and password or create a profile if you are new.
          </p>
        </div>
        <AccountRouter />
      </div>
    </div>
  )
}

export default Account