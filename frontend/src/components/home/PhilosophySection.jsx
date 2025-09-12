import React from 'react'
import cloth_mob from "../../assets/images/craft_cloth.webp"
const PhilosophySection = () => {
  return (
    <section className='mt-[18vw] px-[3vw]' id="philosophy-section">
        <div className="philosophy-heading">
            <h2 className='text-[9vw] font-[300] tracking-tight leading-none text-center'>
                Where Timeless Elegance Meets Modern Minimalism
            </h2>
        </div>
        <div className="cloth-closeup-img-container h-[35vh] relative top-[-3vw] z-[-1]">
            <img src={cloth_mob} alt="" className="cloth-closeup-img h-full object-cover" />
        </div>
        <p className="philosophy-paragraph">
            
        </p>
    </section>
  )
}

export default PhilosophySection