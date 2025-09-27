import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { CustomEase } from 'gsap/all';
import gsap from 'gsap';

const LoadingProgress = () => {
    gsap.registerPlugin(CustomEase);

    useGSAP(() => {
        CustomEase.create(
            "hop",
            "0.625, 0.220, 0.000, 1.000"
        );
        gsap.from(loaderRef.current, {
            width: 0,
            duration: 2,
            delay: 0.2,
            ease: "hop"
        })
    })

    const loaderRef = useRef(null);
    return (
        <div className='fixed inset-0 bg-zinc-200 flex justify-center items-center z-[9999]'>
            <div className="loader-bg h-[3vw] w-[70%] bg-zinc-400 relative">
                <div ref={loaderRef} className="loader absolute bg-zinc-900 h-full w-full"></div>
            </div>
        </div>
    )
}

export default LoadingProgress