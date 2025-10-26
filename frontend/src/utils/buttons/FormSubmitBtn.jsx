import React from 'react'
import MiniLoading from '../loading/MiniLoading'

const FormSubmitBtn = ({status, text="continue"}) => {
    return (
        <button type='submit' disabled={status === "loading"} className='w-full h-[3rem] bg-[#070707] rounded-[3px] text-zinc-100 text-[0.7rem] uppercase relative font-semibold'>{text}
            <span className={`loading-overlay w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#000000d8] ${status !== "loading" && "hidden"}`}>{<MiniLoading />}</span>
        </button>
    )
}

export default FormSubmitBtn