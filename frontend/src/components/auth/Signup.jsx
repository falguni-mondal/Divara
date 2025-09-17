import React from 'react'
import { useSelector } from 'react-redux';

const Signup = () => {
  const {userMail} = useSelector((state) => state.auth.checkEmail);

    return (
        <section className='w-full py-[3vh]' id='signup-form-section'>
            <form className='w-full flex flex-col gap-[2vh]'>
                <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
                    <label className='text-[2.8vw] text-zinc-500 relative'>Email*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw] text-zinc-600' value={userMail} disabled type="email" />
                </div>
                <div className="signup-password-wrapper w-full mt-[1vh]">
                    <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
                        <label className='text-[2.8vw] text-zinc-500 relative'>Create Password*</label>
                        <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
                    </div>
                    <ul className="password-instructions text-[2.8vw] mt-[1vh]">
                        <li>
                            Please enter atleast 8 characters (including an uppercase)
                        </li>
                        <li>
                            Please enter atleast one number
                        </li>
                        <li>
                            {
                                "Please enter atleast one special character (!+,-./:;<=>?@)"
                            }
                        </li>
                    </ul>
                </div>
                <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px] mt-[1vh]">
                    <label className='text-[2.8vw] text-zinc-500 relative'>Select Title*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
                </div>
                <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
                    <label className='text-[2.8vw] text-zinc-500 relative'>Your Name*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
                </div>
                <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
                    <label className='text-[2.8vw] text-zinc-500 relative'>Last Name*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
                </div>
                <div className="auth-form-input-container w-full h-[6vh] flex flex-col justify-center border border-zinc-400 px-2 py-1 rounded-[3px]">
                    <label className='text-[2.8vw] text-zinc-500 relative'>Contact Number*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' type="email" />
                </div>

                <button type='submit' className='w-full h-[6vh] bg-black rounded-[3px] text-zinc-100 text-[3.3vw] uppercase mt-[1vh]'>Continue</button>
            </form>
        </section>
    )
}

export default Signup