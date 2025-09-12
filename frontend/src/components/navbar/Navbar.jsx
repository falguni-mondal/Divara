import React from 'react'
import Logo from '../utils/logo/Logo'
import { Link } from 'react-router-dom'

const Navbar = ({showNav, navMenuController}) => {
    return (
        <>
            <header className='lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-[6vw] p-1 bg-[#e9e9e9] rounded-full z-[999]' id='navbar-mobile'>
                <Link to="/" className="logo rounded-full w-[12vw] h-[12vw] flex justify-center items-center bg-[#111]">
                    <span className="logo-container w-[5.5vw]">
                        <Logo />
                    </span>
                </Link>

                <div onClick={navMenuController} className='w-[12vw] h-[12vw] rounded-full bg-[#a5481d] flex flex-col justify-center items-center gap-[1.2vw]' id="nav-hamburger">
                    <span className={`h-[1.5px] bg-[#db8861] w-[5vw] block ${showNav ? "translate-y-[0.8vw] rotate-45" : ""} transition-all duration-700 ease-in-out`}></span>
                    <span className={`h-[1.5px] bg-[#db8861] w-[5vw] block ${showNav ? "-translate-y-[0.8vw] -rotate-45" : ""} transition-all duration-700 ease-in-out`}></span>
                </div>
            </header>
        </>
    )
}

export default Navbar