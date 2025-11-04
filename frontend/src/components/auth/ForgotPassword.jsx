import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormSubmitBtn from '../../utils/buttons/FormSubmitBtn';
import { codeSender, codeVerifier, passwordReseter, resetEmailStatus } from '../../store/features/user/authSlice';
import { RxEyeOpen } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import { toast } from 'react-toastify';
import toastOptions from '../../configs/toast-options';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";
import passwordValidator from '../../configs/password-validator';

const ForgotPassword = () => {

  const { userMail } = useSelector((state) => state.auth.checkEmail);
  const { status, message, error } = useSelector(state => state.auth.codeVerifier);
  const senderStatus = useSelector(state => state.auth.codeSender.status);
  const senderMessage = useSelector(state => state.auth.codeSender.message);
  const senderError = useSelector(state => state.auth.codeSender.error);
  const reseterStatus = useSelector(state => state.auth.passwordReseter.status);
  const reseterMessage = useSelector(state => state.auth.passwordReseter.message);
  const reseterError = useSelector(state => state.auth.passwordReseter.error);
  const dispatch = useDispatch();
  const codeRef = useRef(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState({
    characters: false,
    number: false,
    specialChar: false
  })

  useEffect(() => {
    if (senderStatus !== "loading" || senderStatus !== "idle") {
      dispatch(codeSender(userMail));
    }
  }, [])

  // PASSWORD CHECKER FUNCTION
    const passwordChecker = (e) => {
        setPassword(e.target.value);
        setValidPassword(passwordValidator(e.target.value));
    }

  const submitHandler = (e) => {
    e.preventDefault();
    if (status === "success" && message) {
      dispatch(passwordReseter());
      return;
    }
    dispatch(codeVerifier(codeRef.current.value));
  }


  return (
    <section className='w-full py-[3vh]' id='forgot-password-form-section'>
      <form onSubmit={submitHandler} className='w-full flex flex-col gap-5'>

        {/* EMAIL INPUT */}
        <div className={`auth-form-input-container w-full h-[3rem] flex flex-col justify-center border px-2 py-1 rounded-[3px] text-zinc-600 relative`}>
          <label className='text-[2.8vw] relative text-zinc-500' htmlFor='login-email'>Email*</label>
          <input className='w-full outline-0 border-0 text-[4.5vw]' value={userMail} disabled type="email" id='login-email' />
          <span onClick={() => dispatch(resetEmailStatus())} className="pencil-icon absolute w-full h-full pr-4 flex items-center justify-end">
            <BsPencil />
          </span>
        </div>

        {/* VERIFICATION CODE INPUT */}
        <div className='w-full' id="verification-code-input-container">
          <p className='text-[#1a1a1a] text-[0.7rem] leading-none mb-1'>Please enter the Verification Code that we just send to your email address :</p>
          <div className={`auth-form-input-container w-full h-[3rem] flex flex-col justify-center border ${status === "success" && message ? "border-zinc-700" : ""} px-2 py-1 rounded-[3px] relative`}>
            <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='verification-code'>verification Code*</label>
            <input ref={codeRef} className='w-full outline-0 border-0 text-[4.5vw] pr-[8vw]' type="text" id='verification-code' autoFocus />
          </div>
          <div className={`resend-btn ${senderStatus === "loading" ? "text-zinc-700" : "text-[#1a1a1a]"} w-full text-right text-[0.8rem] font-semibold mt-1`}>
            <span className='underline' onClick={() => (senderStatus !== "loading" || senderStatus !== "idle") && dispatch(codeSender(userMail))}>Resend?</span>
          </div>
        </div>

        <div className={`password-input-wrapper w-full ${status === "success" && message ? "" : "hidden"}`}>
          <div className={`auth-form-input-container w-full h-[3rem] flex flex-col justify-center border pl-2 py-1 rounded-[3px] relative`}>
            <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-password'>New Password*</label>
            <input onChange={passwordChecker} className='w-full outline-0 border-0 text-[4.5vw] pr-[8vw]' type={`${showPassword ? "text" : "password"}`} id='register-password' />
            <span onClick={() => setShowPassword(prev => !prev)} className={`password-show-btn absolute top-1/2 right-0 pr-2 pl-3 -translate-y-1/2 ${showPassword ? "text-zinc-500 " : "text-black"} text-[4.5vw]`}><RxEyeOpen /></span>
          </div>
          {/* password instructions */}
          <ul className="password-instructions text-[2.8vw] mt-[1vh]">
            <li className={`${password.length > 0 ? validPassword.characters ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
              Please enter 8 characters
            </li>
            <li className={`${password.length > 0 ? validPassword.number ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
              Please enter one number
            </li>
            <li className={`${password.length > 0 ? validPassword.specialChar ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
              {
                "Please enter one special character (!+,-./:;<=>?@)"
              }
            </li>
          </ul>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="form-btn-container w-full">
          <FormSubmitBtn status={status === "success" ? reseterStatus : status} />
        </div>
      </form>
    </section>
  )
}

export default ForgotPassword