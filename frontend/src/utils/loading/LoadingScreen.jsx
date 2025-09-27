import React from 'react'
import loader from "../../assets/gif/loading.gif"
const LoadingScreen = () => {
  return (
    <div className='fixed inset-0 bg-zinc-200 flex justify-center items-center z-[997]'>
            <img className='w-[60px] h-auto object-cover' src={loader} alt="" />
        </div>
  )
}

export default LoadingScreen