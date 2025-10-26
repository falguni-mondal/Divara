import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxEyeOpen } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import { registerUser, resetEmailStatus } from '../../store/features/user/authSlice';
import FormSubmitBtn from '../../utils/buttons/FormSubmitBtn';
import { toast } from 'react-toastify';

//CONFIGS
import toastOptions from '../../configs/toast-options';
import passwordValidator from '../../configs/password-validator';
import formErrorFinder from '../../configs/form-error-finder';

const Signup = () => {
    const dispatch = useDispatch();
    const { userMail } = useSelector((state) => state.auth.checkEmail);
    const { status, error } = useSelector((state) => state.auth.register);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validPassword, setValidPassword] = useState({
        characters: false,
        number: false,
        specialChar: false
    })
    const [formErr, setFormErr] = useState({
        email: false,
        password: false,
        firstname: false,
        lastname: false,
    })


    useEffect(() => {
        if (error) {
            toast.error(error.message, toastOptions);
            return;
        }
    }, [error])


    // PASSWORD CHECKER FUNCTION
    const passwordChecker = (e) => {
        setPassword(e.target.value);
        setValidPassword(passwordValidator(e.target.value));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            email: userMail,
            password: formData.get("password"),
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
        }

        let formErrors = formErrorFinder(data);

        if (data.password === "" || Object.values(validPassword).includes(false)) {
            formErrors = ({ ...formErrors, password: true });
        } else {
            formErrors = ({ ...formErrors, password: false });
        }


        if (Object.values(formErrors).includes(true)) {
            setFormErr({ ...formErrors });
            return;
        }

        dispatch(registerUser(data));
    }


    return (
        <section className='w-full py-[3vh]' id='signup-form-section'>
            <form onSubmit={submitHandler} className='w-full flex flex-col gap-[3vh]'>
                {/* EMAIL INPUT */}
                <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.email ? "border-red-600" : "border-zinc-600"} px-2 py-1 rounded-[3px] text-zinc-600 relative`}>
                    <label className='text-[2.8vw] relative text-zinc-500' htmlFor='register-email'>Email*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' value={userMail} disabled type="email" id='register-email' name='email' />
                    <span onClick={() => dispatch(resetEmailStatus())} className="pencil-icon absolute w-full h-full pr-4 flex items-center justify-end">
                        <BsPencil />
                    </span>
                </div>

                {/* PASSWORD INPUT */}
                <div className="signup-password-wrapper w-full">
                    <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.password ? "border-red-600" : "border-zinc-400"} pl-2 py-1 rounded-[3px] relative`}>
                        <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-password'>Create Password*</label>
                        <input onChange={passwordChecker} className='w-full outline-0 border-0 text-[4.5vw] pr-[8vw]' type={`${showPassword ? "text" : "password"}`} id='register-password' autoFocus name='password' />
                        <span onClick={() => setShowPassword(prev => !prev)} className={`password-show-btn absolute top-1/2 right-0 pr-2 pl-3 -translate-y-1/2 ${showPassword ? "text-zinc-500 " : "text-black"} text-[4.5vw]`}><RxEyeOpen /></span>
                    </div>
                    {/* password instructions */}
                    <ul className="password-instructions text-[2.8vw] mt-[1vh]">
                        <li className={`flex items-center gap-1 ${password.length > 0 ? validPassword.characters ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
                            Please enter 8 characters
                        </li>
                        <li className={`flex items-center gap-1 ${password.length > 0 ? validPassword.number ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
                            Please enter one number
                        </li>
                        <li className={`flex items-center gap-1 ${password.length > 0 ? validPassword.specialChar ? "text-green-600" : "text-red-600" : "text-zinc-700"}`}>
                            {
                                "Please enter one special character (!+,-./:;<=>?@)"
                            }
                        </li>
                    </ul>
                </div>

                {/* FIRSTNAME INPUT */}
                <div className="firstname-input-container">
                    <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.firstname ? "border-red-600" : "border-zinc-400"} px-2 py-1 rounded-[3px]`}>
                        <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-firstname'>First Name*</label>
                        <input className='w-full outline-0 border-0 text-[4.5vw] capitalize' type="text" id='register-firstname' name='firstname' />
                    </div>
                    <p className={`mt-1 name-error-message text-[0.7rem] text-red-700 ${!formErr.lastname && "hidden"}`}>
                        Firstname should be atleast of 3 characters
                    </p>
                </div>

                {/* LASTNAME INPUT */}
                <div className="lastname-input-container">
                    <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.lastname ? "border-red-600" : "border-zinc-400"} px-2 py-1 rounded-[3px]`}>
                        <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-lastname'>Last Name*</label>
                        <input className='w-full outline-0 border-0 text-[4.5vw] capitalize' type="text" id='register-lastname' name='lastname' />
                    </div>
                    <p className={`mt-1 name-error-message text-[0.7rem] text-red-700 ${!formErr.lastname && "hidden"}`}>
                        Lastname should be atleast of 3 characters
                    </p>
                </div>

                {/* SUBMIT BUTTON */}
                <FormSubmitBtn status={status} />
            </form>
        </section>
    )
}

export default Signup