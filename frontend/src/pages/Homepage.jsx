import React from 'react'
import LogoW from '../components/utils/logo/BrandW'
import Hero from '../components/home/Hero'
import ShopSection from '../components/home/shop/ShopSection'

const Homepage = () => {
  return (
    <div className='w-full' id='homepage'>
      <Hero />
      <ShopSection />
    </div>
  )
}

export default Homepage