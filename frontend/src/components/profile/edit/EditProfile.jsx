import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import dp_bg from "../../../assets/bg/abstract_bg.webp";

import { MdOutlineCameraswitch } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import formErrorFinder from '../../../configs/form-error-finder';
import passwordValidator from '../../../configs/password-validator';
import FormSubmitBtn from '../../../utils/buttons/FormSubmitBtn';


const EditProfile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [updateTrigger, setUpdateTrigger] = useState({
        firstname: false,
        lastname: false,
        email: false,
        newPassword: false,
        password: false,
    })
    const [formErr, setFormErr] = useState({
        email: false,
        password: false,
        newPassword: false,
        firstname: false,
        lastname: false
    })

    const status = "idle";

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            newPassword: formData.get('newPassword'),
            password: formData.get('password')
        }

        let formErrors = formErrorFinder(data);

        if (data.newPassword.length > 0) {
            const validPassword = passwordValidator(data.newPassword);
            if (Object.values(validPassword).includes(false)) {
                formErrors = ({ ...formErrors, newPassword: true });
            }
        }
        else {
            formErrors = ({ ...formErrors, newPassword: false })
        }

        const validPassword = passwordValidator(data.password);
        if (Object.values(validPassword).includes(false)) {
            formErrors = ({ ...formErrors, password: true });
        }
        else {
            formErrors = ({ ...formErrors, password: false })
        }

        if (Object.values(formErrors).includes(true)) {
            setFormErr({ ...formErrors });
            return;
        }



    };

    return (
        <div className='w-full' id='edit-profile-page'>
            <div className="user-dp-container shrink-0 aspect-square w-[30%] mx-auto relative">
                {
                    user.displayPicture ?
                        <div className="user-dp">

                        </div>
                        :
                        <div className="default-dp h-full w-full flex justify-center items-center rounded-full overflow-hidden relative">
                            <img
                                className="user-dp-bg absolute h-full w-full object-cover"
                                src={dp_bg}
                                alt=""
                            />
                            <span className="text-[2.5rem] mix-blend-difference text-[#efefef] font-semibold relative">
                                {user.name[0]}
                            </span>
                        </div>

                }
                <span className='absolute bottom-0 right-0 w-[2rem] aspect-square rounded-full bg-[#1a1a1a] text-[#efefef] flex justify-center items-center'>
                    <MdOutlineCameraswitch />
                </span>
            </div>

            <form onSubmit={submitHandler} className='w-full mt-8 flex flex-col gap-5' id="user-dets-update-form">

                <div className="user-firstname-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- firstname</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.firstname ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, firstname: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, firstname: true }))} className={`h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20 capitalize`} type="text" defaultValue={user.firstname} name='firstname' />
                        <BiPencil className={`${updateTrigger.firstname ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`text-red-700 text-[0.7rem] mt-1 ${!formErr.firstname && "hidden"}`}>Firstname must be atleast of 3 characters.</p>
                </div>

                <div className="user-lastname-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- lastname</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.lastname ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, lastname: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, lastname: true }))} className={`h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20 capitalize`} type="text" defaultValue={user.lastname} name='lastname' />
                        <BiPencil className={`${updateTrigger.lastname ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`text-red-700 text-[0.7rem] mt-1 ${!formErr.lastname && "hidden"}`}>Lastname must be atleast of 3 characters.</p>
                </div>

                <div className="user-email-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- email</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.email ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, email: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, email: true }))} className={`h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} type="email" defaultValue={user.email} name='email' />
                        <BiPencil className={`${updateTrigger.email ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`text-red-700 text-[0.7rem] mt-1 ${!formErr.email && "hidden"}`}>Please enter a valid email address.</p>
                </div>

                <div className="user-password-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- password</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.password ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, newPassword: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, newPassword: true }))} className={`h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} placeholder='New Password' type="text" name='newPassword' />
                        <BiPencil className={`${updateTrigger.newPassword ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`text-red-700 text-[0.7rem] mt-1 ${!formErr.newPassword && "hidden"}`}>Password must contain 8 characters including a number and a special character.</p>
                </div>

                <div className="password-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>your password</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.password ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, password: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, password: true }))} className={`h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} placeholder='Password' type="text" name='password' />
                        <BiPencil className={`${updateTrigger.password ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`text-[#1a1a1a] text-[0.7rem] mt-1 ${formErr.password && "hidden"}`}>Enter your account password to apply changes.</p>
                    <p className={`text-red-700 text-[0.7rem] mt-1 ${!formErr.password && "hidden"}`}>Password must contain 8 characters including a number and a special character.</p>
                </div>
                <div className="w-full mt-3" id='user-data-update-btn-container'>
                    <FormSubmitBtn status={status} />
                    <span onClick={() => navigate(-1, { replace: true })} className='w-full h-[3rem] flex justify-center items-center mt-2 rounded-[3px] bg-zinc-200 text-[#1a1a1a] uppercase text-[0.7rem] font-semibold'>cancel</span>
                </div>

            </form>
        </div>
    )
}

export default EditProfile