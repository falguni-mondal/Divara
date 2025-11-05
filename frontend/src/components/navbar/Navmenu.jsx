import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'


import { HiOutlineUser } from "react-icons/hi2";
import { BsBoxSeam } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from 'react-redux';


const Navmenu = ({ showNav, navMenuController }) => {

  const user = useSelector(state => state.auth.user);

  const location = useLocation();

  const accountNavItems = [
    {
      title: "Orders",
      icon: BsBoxSeam,
      path: "/profile/orders"
    },
    {
      title: "Bag",
      icon: BsHandbag,
      path: "/profile/bag"
    },
    {
      title: user ? "Profile" : "Sign In",
      icon: HiOutlineUser,
      path: user ? "/profile" : "/account"
    },
  ]

  return (
    <div className={`fixed inset-0 bg-zinc-100 px-5 ${showNav ? "translate-x-0" : "translate-x-full"} transition-all duration-700 ease-in-out z-[9999] flex flex-col justify-between pb-[30vw]`} id='mobile-nav-menu'>
      <div className="upper-nav">
        <div className="close-btn-container w-full mb-10 flex justify-end">
          <div onClick={navMenuController} className='relative h-[50px] w-[30px] cursor-pointer' id="nav-hamburger">
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-[2px] w-full block transition-all duration-700 ease-in-out translate-y-0 rotate-45 bg-[#1a1a1a]`}></span>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-[2px] w-full block transition-all duration-700 ease-in-outtranslate-y-0 -rotate-45 bg-[#1a1a1a]`}></span>
          </div>
        </div>
        <nav className='flex flex-col gap-5 text-[2.7rem] font-medium leading-none'>
          <NavLink onClick={navMenuController} className={`${location.pathname === "/" && "text-[#808080]"}`} to="/">Home</NavLink>
          <NavLink onClick={navMenuController} className={`${location.pathname === "/collection" && "text-[#808080]"}`} to="/collections">Collection</NavLink>
          <NavLink onClick={navMenuController} className={`${location.pathname === "/about" && "text-[#808080]"}`} to="/about">About</NavLink>
          <NavLink onClick={navMenuController} className={`${location.pathname === "/contact" && "text-[#808080]"}`} to="/contact">Contact Us</NavLink>
        </nav>
      </div>
      <nav className='account-nav w-full flex justify-between'>
        {
          accountNavItems.map(({ title, icon: Icon, path }) => (
            <NavLink key={`${title}-mobile-nav-key`} className='flex flex-col items-center text-[1.2rem] font-semibold' onClick={navMenuController} to={path}>
              <Icon className='text-[1.4rem]' />
              <span className='underline'>{title}</span>
            </NavLink>
          ))
        }
      </nav>
    </div>
  )
}

export default Navmenu