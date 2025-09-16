import React,{ useRef } from 'react'
import { Link } from 'react-router-dom'

const BaseAuth = ({emailChecker}) => {
  const emailRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if(emailRef){
      emailChecker(emailRef.current.value);
    }
  }

  return (
    <section className='w-full py-[3vh]' id='auth-base-form-section'>
      <form onSubmit={submitHandler} className='w-full'>
        <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
          <label className='text-[2.8vw] text-zinc-500 relative'>Email*</label>
          <input ref={emailRef} className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
        </div>
        <button type='submit' className='w-full h-[6vh] bg-black rounded-[3px] text-zinc-100 text-[3.3vw] uppercase mt-[3vh]'>Continue</button>
      </form>
    </section>
  )
}

export default BaseAuth