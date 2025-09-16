import React from 'react'

const Signin = ({userMail}) => {
  return (
    <section className='w-full py-[3vh]' id='signin-form-section'>
      <form className='w-full flex flex-col gap-[3vh]'>
        <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
          <label className='text-[2.8vw] text-zinc-500 relative'>Email*</label>
          <input className='w-full outline-0 border-0 text-[4.5vw] text-zinc-600' value={userMail} disabled type="email" />
        </div>
        <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
          <label className='text-[2.8vw] text-zinc-500 relative'>Password*</label>
          <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
        </div>
        <button type='submit' className='w-full h-[6vh] bg-black rounded-[3px] text-zinc-100 text-[3.3vw] uppercase'>Continue</button>
      </form>
    </section>
  )
}

export default Signin