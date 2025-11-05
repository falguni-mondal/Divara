import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verificationLinkSender } from '../../store/features/user/authSlice';
import { backendBaseApi, frontendBaseUrl } from '../../configs/keys';
import LoadingScreen from '../../utils/loading/LoadingScreen';
import { Navigate, useNavigate } from 'react-router-dom';

import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import toastOptions from '../../configs/toast-options';
import axios from 'axios';
import MiniLoading from '../../utils/loading/MiniLoading';


const EmailVerification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, message, error } = useSelector((state) => state.auth.verifyLink);
    const user = useSelector(state => state.auth.user);
    const userStatus = useSelector(state => state.auth.status);


    const linkSender = () => {
        dispatch(verificationLinkSender({ userEmail: user?.email, frontendBaseUrl }));
    }
    
    useEffect(() => {
        linkSender();
    }, [])

    useEffect(() => {
        if(message){
            toast.success("Verification link sent!", toastOptions);
        }
        if(error){
            toast.error(`${error.message}`, toastOptions);
        }
    }, [message, error])


    if (userStatus === "loading" || userStatus === "idle") {
        return <LoadingScreen />
    }
    if (!user) {
        return <Navigate to="/account" replace />
    }
    if (user && user.isVerified && user.role === "user") {
        return <Navigate to="/profile" replace />
    }
    if (user && user.isVerified && (user.role === "admin" || user.role === "super-admin")) {
        return <Navigate to="/admin" replace />
    }

    
    const accountReseter = async () => {
        try {
            await axios.get(`${backendBaseApi}/auth/account/reset`, {
                withCredentials: true,
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className='py-[10vh] font-[300] text-center px-[3vw]' id='email-verification-page'>
            <h1 className='text-[8.5vw] leading-none'>VERIFY YOUR EMAIL ADDRESS</h1>
            <p className='text-[3.5vw] my-10'>
                Please check your email <span onClick={accountReseter} className='inline-flex items-center font-semibold gap-1 underline cursor-pointer'>{user?.email} <span><FaRegEdit /></span></span> and click the <span className="font-semibold">verification link</span> we just sent to complete your account setup. If you don't see the email within a few minutes, check your spam folder or click the <span className='font-semibold'>"Resend"</span> button below. The verification link will expire in <span className="font-semibold">15 minutes</span> for security reasons.
            </p>
            <div className="buttons text-[0.8rem] flex gap-2 justify-center items-center font-semibold">
                <button onClick={() => navigate("/")} className='px-7 py-3 rounded-[2px] uppercase bg-zinc-300 text-[#070707]'>Cancel</button>
                <button onClick={linkSender} className={`px-7 py-3 rounded-[2px] uppercase bg-[#070707] text-zinc-100 relative`} disabled={status === "loading"}>
                    Resend
                    <span className={`${status === "loading" ? "" : "hidden"} absolute h-full w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-[#000000d8]`}><MiniLoading /></span>
                </button>
            </div>
        </div>
    )
}

export default EmailVerification