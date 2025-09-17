import React from 'react'
import { Link } from 'react-router-dom'
import BrandW from '../../utils/logo/BrandW'

const Footer = () => {
  
  return (
    <section className='text-zinc-100 bg-black py-[20vw] px-[3vw]' id='footer-section'>
      <footer className='mb-[20vw] px-[2vw]'>
        <div className="footer-link-sections flex flex-col gap-12">
          <div className="menu-section">
            <h3 className="footer-heading text-[3.5vw] uppercase font-semibold">
              (Menu)
            </h3>
            <ul className="link-container mt-3 flex flex-col gap-2">
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Shop</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Shop</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Collection</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Collection</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Cart</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Cart</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Orders</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Orders</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Account</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Account</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="customer-support-section">
            <h3 className="footer-heading text-[3.5vw] uppercase font-semibold">
              (Customer Support)
            </h3>
            <ul className="link-container mt-3 flex flex-col gap-2">
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>About</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>About</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Contact us</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Contact us</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="socials-section">
            <h3 className="footer-heading text-[3.5vw] uppercase font-semibold">
              (Socials)
            </h3>
            <ul className="link-container mt-3 flex flex-col gap-2">
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Portfolio</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Portfolio</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Github</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>Github</span>
                </Link>
              </li>
              <li className='link-wrapper h-[4vw] flex overflow-hidden'>
                <Link>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>LinkedIn</span>
                  <span className='block leading-none text-[3.5vw] uppercase h-[4vw]'>LinkedIn</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyright-text text-[3.5vw] mb-10">
        © 2025 Divara - All rigths reserved.
      </div>
      <div className="brand-logo w-full">
        <BrandW />
      </div>
    </section>
  )
}

export default Footer