import { Link, NavLink, useLocation } from 'react-router-dom'
import TextLogo from '../../utils/logo/TextLogo'
import { Icon } from "@iconify/react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ navMenuController }) => {

  const location = useLocation();

  useGSAP(() => {
    if (location.pathname !== '/') {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      return;
    }

    const navbarAnim = gsap.from(".navbar", {
      background: "transparent",
      scrollTrigger: {
        trigger: '.navbar',
        start: 'top -60%',
        end: 'top -50%',
        scrub: 1,
      }
    });

    const logoAnim = gsap.from(".logo-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: '.logo-container',
        start: 'top -58.8%',
        end: 'top -50%',
        scrub: 1,
      }
    });

    return () => {
      navbarAnim.kill();
      logoAnim.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, {
    dependencies: [location.pathname],
    revertOnUpdate: true
  });

  return (
    <header className='lg:hidden w-full fixed top-0 left-0 flex justify-center items-center z-[999]' id='navbar-container'>
      <div className='navbar container w-full flex justify-between items-center px-3 h-[45px] bg-[#f8f8f8]' id="mobile-navbar">
        <div className="logo-container">
          <Link to="/">
            <TextLogo />
          </Link>
        </div>

        <div className="nav-container flex gap-5 items-center">
          <nav className='flex gap-4 items-center text-[#fefefe] text-[1.3rem] mix-blend-difference'>
            <NavLink to="/profile/bag">
              <Icon icon="iconamoon:shopping-bag-light" />
            </NavLink>

            <NavLink to="/account">
              <Icon icon="iconamoon:profile-light" />
            </NavLink>

            <NavLink to="/search">
              <Icon icon="iconamoon:search-light" />
            </NavLink>
          </nav>
          <div onClick={navMenuController} className='relative h-full w-[25px] cursor-pointer' id="nav-hamburger">
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-[1.5px] w-full block transition-all duration-700 ease-in-out mix-blend-difference -translate-y-[3px] bg-[#fefefe]`}></span>

            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-[1.5px] w-full block transition-all duration-700 ease-in-out mix-blend-difference translate-y-[3px] bg-[#fefefe]`}></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar