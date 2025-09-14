import React from 'react'
import Hero from '../components/home/Hero'
import ShopCategories from '../components/home/shop/ShopCategories'
import CollectionSection from '../components/home/CollectionSection'
import PhilosophySection from '../components/home/PhilosophySection'
import LuxurySection from '../components/home/luxury/LuxurySection'
import ContactSection from '../components/home/ContactSection'

const Homepage = () => {
  return (
    <div className='w-full' id='homepage'>
      <Hero />
      <ShopCategories />
      <CollectionSection />
      <PhilosophySection />
      <LuxurySection />
    </div>
  )
}

export default Homepage