import React from 'react'
import Hero from '../components/home/Hero'
import ShopSection from '../components/home/shop/ShopSection'
import CollectionSection from '../components/home/CollectionSection'
import PhilosophySection from '../components/home/PhilosophySection'
import LuxurySection from '../components/home/luxury/LuxurySection'

const Homepage = () => {
  return (
    <div className='w-full' id='homepage'>
      <Hero />
      <ShopSection />
      <CollectionSection />
      <PhilosophySection />
      <LuxurySection />
    </div>
  )
}

export default Homepage