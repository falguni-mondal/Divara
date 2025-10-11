import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verificationLinkSender } from '../../store/features/user/authSlice';
import { frontendBaseUrl } from '../../configs/keys';

const EmailVerification = () => {
    const dispatch = useDispatch();
    const {message, error} = useSelector((state) => state.auth.verifyLink);
    const user = useSelector(state => state.auth.user);

    const accountReseter = () => {

    }

    const linkResender = () => {
        dispatch(verificationLinkSender({userEmail: user?.email, frontendBaseUrl}));
    }

    useEffect(() => {
        dispatch(verificationLinkSender({userEmail: user?.email, frontendBaseUrl}));
        message && console.log(message);
        error && console.log(error);
    }, [])

  return (
    <div className='py-[10vh] font-[300] text-center px-[3vw]' id='email-verification-page'>
        <h1 className='text-[8.5vw] leading-none'>VERIFY YOUR EMAIL ADDRESS</h1>
        <p className='text-[3.5vw] my-10'>
            Please check your email and click the <span className="font-semibold">verification link</span> we just sent to complete your account setup. If you don't see the email within a few minutes, check your spam folder or click the <span className='font-semibold'>"Resend"</span> button below. The verification link will expire in <span className="font-semibold">24 hours</span> for security reasons.
        </p>
        <div className="buttons">
            <span onClick={accountReseter} className='text-[3vw] px-7 py-3 rounded-[2px] uppercase bg-zinc-300 text-[#070707] font-semibold cursor-pointer'>Cancel</span>
            <span onClick={linkResender} className='text-[3vw] px-7 py-3 rounded-[2px] uppercase bg-[#070707] text-zinc-100 font-semibold ml-2 cursor-pointer'>Resend</span>
        </div>
    </div>
  )
}

export default EmailVerification