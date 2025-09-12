import React from 'react'
import heroImg from "../../assets/bg/hero_mobile.webp";
import BrandW from '../utils/logo/BrandW';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const Hero = () => {
    return (
        <section className='w-full h-[80dvh] relative flex flex-col items-center justify-between text-zinc-200' id='hero-section'>
            <img className='absolute top-0 left-0 w-full h-full object-cover' src={heroImg} alt="" />
            <div className="brand-name relative w-[75%] pt-[8vh]">
                <BrandW />
            </div>
            <div className="cta-container pb-[3vh] relative flex flex-col items-center gap-[2vh]">
                <h1 className="heading text-[6vw] tracking-tight">Fall Winter 2025</h1>
                <Link className='py-[3.5vw] px-[8vw] text-[3vw] font-semibold rounded-[2px] bg-zinc-200 text-zinc-900' to="/collections" id="cta-btn">SHOP NOW</Link>
                <div className="scroll-txt h-[3.5vw] flex items-center text-[3vw] overflow-hidden">
                    <span className="scroll-txt-container relative flex items-center gap-[0.5vw] animate-updown">
                        Scroll to Discover More <IoIosArrowDown />
                    </span>
                </div>
            </div>
        </section>
    )
}

export default Hero