import React from 'react'
import LogoW from '../components/utils/logo/BrandW'
import Hero from '../components/home/Hero'
import ShopSection from '../components/home/shop/ShopSection'
import CollectionSection from '../components/home/CollectionSection'
import PhilosophySection from '../components/home/PhilosophySection'

const Homepage = () => {
  return (
    <div className='w-full pb-[20vw]' id='homepage'>
      <Hero />
      <ShopSection />
      <CollectionSection />
      <PhilosophySection />
    </div>
  )
}

export default Homepage