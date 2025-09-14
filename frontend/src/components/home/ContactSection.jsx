import React from 'react'
import contactBg from "../../assets/bg/contact_bg.webp"
import SectionHeading from '../utils/SectionHeading'
import { Link } from 'react-router-dom'
const ContactSection = () => {
  return (
    <section className='w-full px-[3vw] mt-[30vw]' id='contact-section'>
        <div className="contact-bg-container w-full h-[40vh] relative">
            <img className='h-full w-full object-cover object-right' src={contactBg} alt="" />
            <div id="contact-overlay" className="absolute w-full h-full top-0 left-0 flex flex-col justify-center text-zinc-100 px-[10vw] bg-[#00000048]">
                <div className="contact-header mb-[7vh]">
                    <span className='leading-none text-[4.5vw] uppercase'>Need Help ?</span>
                    <h2 className='uppercase text-[6vw] tracking-wider leading-none'>We are here to help</h2>
                </div>
                <Link className='w-[30vw] h-[4.5vh] flex justify-center items-center border border-zinc-100 rounded-[3px] text-[3.5vw] uppercase backdrop-blur-[15px] bg-[#ffffff07]'>Contact</Link>
            </div>
        </div>
    </section>
  )
}

export default ContactSection