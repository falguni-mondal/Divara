import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingScreen from '../../utils/loading/LoadingScreen';
import FormSubmitBtn from '../../utils/buttons/FormSubmitBtn';
import { loginUser, resetEmailStatus } from '../../store/features/user/authSlice';
import { RxEyeOpen } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import { replace, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastOptions from '../../configs/toast-options';

const Signin = () => {
  const { userMail } = useSelector((state) => state.auth.checkEmail);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth.login);
  const { user } = useSelector((state) => state.auth);


  const submitHandler = (e) => {
    e.preventDefault();
    const email = userMail && userMail;
    const password = passwordRef.current.value;
    dispatch(loginUser({ email, password }));

    if (status === "failed") {
      toast.error(`${error.message}`, toastOptions);
      return;
    }

    if(!user?.isVerified){
      navigate("/account/verify");
    }
    else{
      navigate(-1);
    }
  }

  return (
    <section className='w-full py-[3vh]' id='signin-form-section'>
      <form onSubmit={submitHandler} className='w-full flex flex-col gap-[3vh]'>

        {/* EMAIL INPUT */}
        <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border px-2 py-1 rounded-[3px] text-zinc-600 relative`}>
          <label className='text-[2.8vw] relative text-zinc-500' htmlFor='login-email'>Email*</label>
          <input className='w-full outline-0 border-0 text-[4.5vw]' value={userMail} disabled type="email" id='login-email' />
          <span onClick={() => dispatch(resetEmailStatus())} className="pencil-icon absolute w-full h-full pr-4 flex items-center justify-end">
            <BsPencil />
          </span>
        </div>

        {/* PASSWORD INPUT */}
        <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px] relative">
          <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='login-password'>Password*</label>
          <input ref={passwordRef} className='w-full outline-0 border-0 text-[4.5vw] pr-[8vw]' type={`${showPassword ? "text" : "password"}`} id='login-password' />
          <span onClick={() => setShowPassword(prev => !prev)} className={`password-show-btn absolute top-1/2 right-0 pr-2 pl-3 -translate-y-1/2 ${showPassword ? "text-zinc-500 " : "text-black"} text-[4.5vw]`}><RxEyeOpen /></span>
        </div>

        {/* SUBMIT BUTTON */}
        <FormSubmitBtn status={status} />
      </form>
    </section>
  )
}

export default Signin