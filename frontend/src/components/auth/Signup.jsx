import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RxEyeOpen } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import { registerUser, resetEmailStatus } from '../../store/features/user/authSlice';
import FormSubmitBtn from '../../utils/buttons/FormSubmitBtn';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userMail } = useSelector((state) => state.auth.checkEmail);
    const { status } = useSelector((state) => state.auth.register);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validPassword, setValidPassword] = useState({
        characters: false,
        number: false,
        specialChar: false
    })
    const nameRef = useRef(null);
    const [formErr, setFormErr] = useState({
        email: false,
        password: false,
        name: false,
    })




    // PASSWORD CHECKER FUNCTION
    const passwordChecker = (e) => {
        setPassword(e.target.value);
        const userPassword = e.target.value;

        const minLength = /^.{8,}$/;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!+,\-./:;<=>?@]/;

        if (minLength.test(userPassword)) {
            setValidPassword(prev => ({ ...prev, characters: true }));
        } else {
            setValidPassword(prev => ({ ...prev, characters: false }));
        }

        if (hasNumber.test(userPassword)) {
            setValidPassword(prev => ({ ...prev, number: true }));
        } else {
            setValidPassword(prev => ({ ...prev, number: false }));
        }

        if (hasSpecialChar.test(userPassword)) {
            setValidPassword(prev => ({ ...prev, specialChar: true }));
        } else {
            setValidPassword(prev => ({ ...prev, specialChar: false }));
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formErrors = {
            email: false,
            password: false,
            name: false,
        }

        if (!userMail) {
            setFormErr(prev => ({ ...prev, email: true }));
            formErrors = ({ ...formErrors, email: true });
        } else {
            setFormErr(prev => ({ ...prev, email: false }));
            formErrors = ({ ...formErrors, email: false });
        }

        if (password === "" || Object.values(validPassword).includes(false)) {
            setFormErr(prev => ({ ...prev, password: true }));
            formErrors = ({ ...formErrors, password: true });
        } else {
            setFormErr(prev => ({ ...prev, password: false }));
            formErrors = ({ ...formErrors, password: false });
        }

        if (nameRef.current.value.length < 3) {
            setFormErr(prev => ({ ...prev, name: true }));
            formErrors = ({ ...formErrors, name: true });
        } else {
            setFormErr(prev => ({ ...prev, name: false }));
            formErrors = ({ ...formErrors, name: false });
        }

        if (Object.values(formErrors).includes(true))
            return;

        const data = {
            email: userMail,
            password,
            name: nameRef.current.value
        }

        dispatch(registerUser(data));
        if (status === "success") {
            dispatch(resetEmailStatus());
        }
    }

    useEffect(() => {
        if (status === "success") {
            navigate("/account/verify", { replace: true });
        }
    }, [status])


    return (
        <section className='w-full py-[3vh]' id='signup-form-section'>
            <form onSubmit={submitHandler} className='w-full flex flex-col gap-[2vh]'>
                {/* EMAIL INPUT */}
                <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.email ? "border-red-600" : "border-zinc-600"} px-2 py-1 rounded-[3px] text-zinc-600 relative`}>
                    <label className='text-[2.8vw] relative text-zinc-500' htmlFor='register-email'>Email*</label>
                    <input className='w-full outline-0 border-0 text-[4.5vw]' value={userMail} disabled type="email" id='register-email' />
                    <span onClick={() => dispatch(resetEmailStatus())} className="pencil-icon absolute w-full h-full pr-4 flex items-center justify-end">
                        <BsPencil />
                    </span>
                </div>

                {/* PASSWORD INPUT */}
                <div className="signup-password-wrapper w-full mt-[1vh]">
                    <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.password ? "border-red-600" : "border-zinc-400"} pl-2 py-1 rounded-[3px] relative`}>
                        <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-password'>Create Password*</label>
                        <input onChange={passwordChecker} className='w-full outline-0 border-0 text-[4.5vw] pr-[8vw]' type={`${showPassword ? "text" : "password"}`} id='register-password' />
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

                {/* NAME INPUT */}
                <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.name ? "border-red-600" : "border-zinc-400"} px-2 py-1 rounded-[3px]`}>
                    <label className='text-[2.8vw] text-zinc-500 relative' htmlFor='register-name'>Your Name*</label>
                    <input ref={nameRef} className='w-full outline-0 border-0 text-[4.5vw]' type="text" id='register-name' />
                </div>

                {/* CONTACT INPUT */}
                {/* <div className={`auth-form-input-container w-full h-[6vh] flex flex-col justify-center border ${formErr.contact ? "border-red-600" : "border-zinc-400"} py-1 rounded-[3px]`}>
                    <label className='text-[2.8vw] text-zinc-500 px-2'>Contact Number*</label>
                    <div className="input-wrapper relative flex gap-6 items-center px-2">
                        Country Code Display
                        <div onClick={() => setDropdownReveal(prev => !prev)} className="flex items-center leading-none text-[4.5vw] text-zinc-600" id='selected-country-code'>
                            <ReactCountryFlag countryCode={country.code} svg />
                            <span className="country-dial-code font-medium">{country.dial_code}</span>
                            <MdKeyboardArrowDown className='shrink-0' />
                        </div>
                        Country code Input
                        <input ref={contactRef} className='w-full outline-0 border-0 text-[4.5vw]' type="text" />
                        Country Code Dropdown
                        <ul className={`country-code-dropdown ${dropdownReveal ? "" : "hidden"} absolute top-[120%] max-h-[20vh] overflow-scroll bg-[#f0f0f0da] backdrop-blur-lg px-2 rounded-[2px]`}>
                            {
                                countryCodes.map(({ name, code, dial_code }) => (
                                    <li onClick={() => setCountry({ name, code, dial_code })} key={`${name}-dialCode-key`} className='py-1 flex items-center gap-1'>
                                        <ReactCountryFlag countryCode={code} svg />
                                        <span className="country-name font-medium">{name}</span>
                                        <span className="country-dial-code font-medium">({dial_code})</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div> */}

                {/* SUBMIT BUTTON */}
                <FormSubmitBtn status={status} />
            </form>
        </section>
    )
}

export default Signup