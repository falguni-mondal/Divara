import React from 'react'
import { Link } from 'react-router-dom'


import { FiUser } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";


const Navmenu = ({ showNav, navMenuController }) => {

  const accountNavItems = [
    {
      title: "Orders",
      icon : BsBoxSeam,
      path: "/orders"
    },
    {
      title: "Bag",
      icon : BsHandbag,
      path: "/bag"
    },
    {
      title: "Sign In",
      icon : FiUser,
      path: "/account"
    },
  ]

  return (
    <div className={`fixed inset-0 bg-zinc-100 p-[10vw] ${showNav ? "translate-x-0" : "translate-x-full"} transition-all duration-700 ease-in-out z-[998] flex flex-col justify-between pb-[30vw]`} id='mobile-nav-menu'>
      <nav className='flex flex-col gap-[7vw] text-[10vw] leading-none'>
        <Link onClick={navMenuController} to="/">Home</Link>
        <Link onClick={navMenuController} to="/collections">Collection</Link>
        <Link onClick={navMenuController} to="/about">About</Link>
        <Link onClick={navMenuController} to="/contact">Contact Us</Link>
      </nav>
      <nav className='account-nav w-full flex justify-between'>
        {
          accountNavItems.map(({title, icon : Icon, path}) => (
            <Link key={`${title}-mobile-nav-key`} className='flex flex-col items-center text-[5vw]' onClick={navMenuController} to={path}>
              <Icon className='text-[6vw]' />
              <span className='underline'>{title}</span>
            </Link>
          ))
        }
      </nav>
    </div>
  )
}

export default Navmenu