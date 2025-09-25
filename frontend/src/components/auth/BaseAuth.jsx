import React,{ useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkMail } from '../../store/features/user/authSlice';
import FormSubmitBtn from '../../utils/buttons/FormSubmitBtn';

const BaseAuth = () => {
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.auth.checkEmail);

  const submitHandler = (e) => {
    e.preventDefault();
    if(emailRef){
      dispatch(checkMail(emailRef.current.value));
    }
  }
  

  return (
    <section className='w-full py-[3vh]' id='auth-base-form-section'>
      <form onSubmit={submitHandler} className='w-full'>
        <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
          <label className='text-[2.8vw] text-zinc-500 relative'>Email*</label>
          <input ref={emailRef} className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
        </div>
        <FormSubmitBtn status={status}/>
      </form>
    </section>
  )
}

export default BaseAuth