import React from 'react'
import { Link } from 'react-router-dom'

const Navmenu = ({showNav, navMenuController}) => {
  return (
    <div className={`fixed inset-0 bg-[#f9f9f9] p-[10vw] ${showNav ? "translate-x-0" : "translate-x-full"} transition-all duration-700 ease-in-out z-[998]`} id='mobile-nav-menu'>
        <nav className='flex flex-col gap-[7vw] text-[10vw] leading-none'>
            <Link onClick={navMenuController} to="/">Home</Link>
            <Link onClick={navMenuController} to="/collections">Collection</Link>
            <Link onClick={navMenuController} to="/cart">Cart</Link>
            <Link onClick={navMenuController} to="/account">Account</Link>
            <Link onClick={navMenuController} to="/about">About</Link>
            <Link onClick={navMenuController} to="/contact">Contact Us</Link>
        </nav>
    </div>
  )
}

export default Navmenu