import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FormSubmitBtn from '../../../utils/buttons/FormSubmitBtn';
import { profileUpdater } from '../../../store/features/user/profileSlice';
import useEffectOnUpdate from '../../../hooks/useEffectOnUpdate';
import { MdOutlineCameraswitch } from "react-icons/md";
import { BiPencil } from "react-icons/bi";

//CONFIGS
import toastOptions from '../../../configs/toast-options';
import formErrorFinder from '../../../configs/form-error-finder';
import passwordValidator from '../../../configs/password-validator';
import { checkAuth } from '../../../store/features/user/authSlice';


const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [updateTrigger, setUpdateTrigger] = useState({
        firstname: false,
        lastname: false,
        email: false,
        newPassword: false,
        password: false,
        address: false,
    })
    const [formErr, setFormErr] = useState({
        email: false,
        password: false,
        newPassword: false,
        firstname: false,
        lastname: false,
        address: false,
    })

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const { status, message, error } = useSelector(state => state.profile.update);

    const fileSelector = () => {
        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/jpeg, image/jpg, image/png, image/webp";

        input.onchange = handleFileSelect;

        input.click();

        input.remove();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, JPEG, PNG, and WEBP are allowed!", toastOptions);
            return;
        }


        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB!", toastOptions)
            return;
        }

        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = new FormData();
    
        data.append('firstname', formData.get('firstname').trim());
        data.append('lastname', formData.get('lastname').trim());
        data.append('email', formData.get('email').trim());
        data.append('password', formData.get('password'));
        data.append('address', formData.get('address'));

        const newPassword = formData.get('newPassword');
        if (newPassword && newPassword.trim().length > 0) {
            data.append('newPassword', newPassword);
        }
        
        if (selectedFile) {
            data.append('profileImage', selectedFile);
        }

        const firstname = formData.get('firstname').trim();
        const lastname = formData.get('lastname').trim();
        const email = formData.get('email').trim();
        const address = formData.get('address');
        const hasPasswordChange = newPassword && newPassword.trim().length > 0;

        if (
            email === user.email && 
            firstname === user.firstname && 
            lastname === user.lastname &&
            address === user.address && 
            !hasPasswordChange && 
            !selectedFile
        ) {
            toast.info("No changes detected!", toastOptions);
            return;
        }

        let formErrors = formErrorFinder({email, firstname, lastname});

        if (hasPasswordChange) {
            const validPassword = passwordValidator(newPassword);
            if (Object.values(validPassword).includes(false)) {
                formErrors = ({ ...formErrors, newPassword: true });
            }
        }
        else {
            formErrors = ({ ...formErrors, newPassword: false })
        }

        const validPassword = passwordValidator(formData.get("password"));
        if (Object.values(validPassword).includes(false)) {
            formErrors = ({ ...formErrors, password: true });
        }
        else {
            formErrors = ({ ...formErrors, password: false })
        }

        if(address.length !== 0 && address.length < 5){
            formErrors = ({ ...formErrors, address: true })
        }
        else{
            formErrors = ({ ...formErrors, address: false })
        }

        if (Object.values(formErrors).includes(true)) {
            setFormErr({ ...formErrors });
            return;
        }

        setFormErr({
            email: false,
            password: false,
            newPassword: false,
            firstname: false,
            lastname: false
        });

        dispatch(profileUpdater(data))
    };

    useEffectOnUpdate(() => {
        if (message) {
            toast.success(message, toastOptions);
            dispatch(checkAuth());
        }
        if (error) {
            toast.error(error, toastOptions);
        }
    }, [message, error])

    return (
        <div className='w-full' id='edit-profile-page'>
            <div className={`${!preview && !user.profileImage && "user-dp-container"} shrink-0 aspect-square w-[30%] mx-auto relative rounded-full`}>
                <div onClick={fileSelector} className="user-dp h-full w-full flex justify-center items-center rounded-full overflow-hidden relative">
                    <img
                        className="user-dp-bg absolute h-full w-full object-cover"
                        src={preview || user.profileImage || user.profileBackground}
                        alt={`${user.name}-display-picture`}
                    />
                    <span className={`${preview ? "hidden" : user.profileImage && "hidden"} text-[2.5rem] mix-blend-difference text-[#efefef] font-semibold relative`}>
                        {user.name[0]}
                    </span>
                </div>
                <span onClick={fileSelector} className='absolute bottom-0 right-0 w-[2rem] aspect-square rounded-full bg-[#1a1a1a] text-[#efefef] flex justify-center items-center'>
                    <MdOutlineCameraswitch />
                </span>
            </div>

            <form onSubmit={submitHandler} className='w-full mt-8 flex flex-col gap-5' id="user-dets-update-form">

                <div className="user-firstname-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- firstname</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.firstname ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, firstname: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, firstname: true }))} className={`${updateTrigger.firstname? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20 capitalize`} type="text" defaultValue={user.firstname} name='firstname' placeholder='Firstname'/>
                        <BiPencil className={`${updateTrigger.firstname ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`w-full text-red-700 text-[0.7rem] mt-1 ${!formErr.firstname && "hidden"}`}>Firstname must be atleast of 3 characters.</p>
                </div>

                <div className="user-lastname-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- lastname</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.lastname ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, lastname: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, lastname: true }))} className={`${updateTrigger.lastname? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20 capitalize`} type="text" defaultValue={user.lastname} name='lastname' placeholder='Lastname'/>
                        <BiPencil className={`${updateTrigger.lastname ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`w-full text-red-700 text-[0.7rem] mt-1 ${!formErr.lastname && "hidden"}`}>Lastname must be atleast of 3 characters.</p>
                </div>

                <div className="user-email-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- email</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.email ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, email: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, email: true }))} className={`${updateTrigger.email? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} type="email" defaultValue={user.email} name='email' />
                        <BiPencil className={`${updateTrigger.email ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <div className="email-instructions w-full leading-tight">
                        <p className={`w-full text-[#1a1a1a] text-[0.7rem] mt-1`}>Note: Email change will only take effect after you verify the new address.</p>
                        <p className={`w-full text-red-700 text-[0.7rem] mt-1 ${!formErr.email && "hidden"}`}>Please enter a valid email address.</p>
                    </div>
                </div>

                <div className="user-address-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- address</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.address ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, address: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, address: true }))} className={`${updateTrigger.address? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} type="text" defaultValue={user.address} name='address' placeholder='New Address'/>
                        <BiPencil className={`${updateTrigger.address ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <div className="address-instructions w-full leading-tight">
                        <p className={`w-full text-red-700 text-[0.7rem] mt-1 ${!formErr.address && "hidden"}`}>Address must be at least of 5 characters.</p>
                    </div>
                </div>

                <div className="user-new-password-update-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>change- password</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.newPassword ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, newPassword: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, newPassword: true }))} className={`${updateTrigger.newPassword? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} placeholder='New Password' type="text" name='newPassword' />
                        <BiPencil className={`${updateTrigger.newPassword ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`w-full text-red-700 text-[0.7rem] mt-1 ${!formErr.newPassword && "hidden"}`}>Password must contain 8 characters including a number and a special character.</p>
                </div>

                <div className="user-password-input-container w-full">
                    <span className={`name-update-preview-title uppercase text-[#1a1a1a] font-medium text-[0.7rem]`}>your password</span>
                    <div className={`update-input-container w-full h-[3rem] text-[1.050rem] relative ${updateTrigger.password ? "" : "bg-zinc-200 rounded-[3px]"}`}>
                        <input onBlur={() => setUpdateTrigger(prev => ({ ...prev, password: false }))} onFocus={() => setUpdateTrigger(prev => ({ ...prev, password: true }))} className={`${updateTrigger.password? "" : "pr-[2rem]"} h-full outline-0 w-full border border-zinc-300 rounded-[3px] px-2 relative z-20`} placeholder='Password' type="text" name='password' />
                        <BiPencil className={`${updateTrigger.password ? "hidden" : "absolute right-2 top-1/2 -translate-y-1/2 z-10"}`} />
                    </div>
                    <p className={`w-full text-[#1a1a1a] text-[0.7rem] mt-1 leading-tight`}>Enter your account password to apply changes.</p>
                    <p className={`w-full text-red-700 text-[0.7rem] mt-1 leading-tight ${!formErr.password && "hidden"}`}>Password must contain 8 characters including a number and a special character.</p>
                </div>

                <div className="w-full mt-3" id='user-data-update-btn-container'>
                    <FormSubmitBtn status={status} />
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className='w-full h-[3rem] flex justify-center items-center mt-2 rounded-[3px] bg-zinc-200 text-[#1a1a1a] uppercase text-[0.7rem] font-semibold'
                    >
                        cancel
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EditProfile