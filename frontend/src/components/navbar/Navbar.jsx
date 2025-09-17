import React from 'react'
import Logo from '../../utils/logo/Logo'
import { Link } from 'react-router-dom'

const Navbar = ({showNav, navMenuController}) => {
    return (
        <>
            <header className='lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-[6vw] p-1 bg-[#00000011] backdrop-blur-lg rounded-full z-[999] inner-shadow' id='navbar-mobile'>
                <Link to="/" className="logo glow-white rounded-full w-[12vw] h-[12vw] overflow-hidden flex justify-center items-center bg-[#000]">
                    <span className="logo-container w-[20vw]">
                        <Logo />
                    </span>
                </Link>

                <div onClick={navMenuController} className='w-[12vw] h-[12vw] rounded-full bg-[#853e03] flex flex-col justify-center items-center gap-[1.2vw]' id="nav-hamburger">
                    <span className={`h-[1.5px] bg-[#ffba9a] w-[5vw] block ${showNav ? "translate-y-[0.8vw] rotate-45" : ""} transition-all duration-700 ease-in-out`}></span>
                    <span className={`h-[1.5px] bg-[#ffba9a] w-[5vw] block ${showNav ? "-translate-y-[0.8vw] -rotate-45" : ""} transition-all duration-700 ease-in-out`}></span>
                </div>
            </header>
        </>
    )
}

export default Navbar