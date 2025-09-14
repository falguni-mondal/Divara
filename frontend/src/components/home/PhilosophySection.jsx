import React from 'react'
import modelsVideo from "../../assets/videos/models.mp4"
import SectionHeading from '../utils/SectionHeading'
const PhilosophySection = () => {
  return (
    <section className='px-[3vw]' id="philosophy-section">
      <div className="section-divider w-full text-center mb-[12vw] uppercase text-[3.5vw] font-semibold">
        featuring
      </div>
      <div className="video-container w-full h-[70vh] mb-[8vw]">
        <video src={modelsVideo} className='h-full w-full object-cover' autoPlay muted loop />
      </div>
      <div className="philosophy-content w-full">
        <SectionHeading text="The Divara Craftmanship" />
        <p className="philosophy-paragraph text-[4.2vw] font-[300] text-center mt-[3vw]">
          Every creation is more than a product—it is a statement of artistry, detail, and timeless design. Reflects passion, craftsmanship, and elegance, turning simple ideas into luxury.
        </p>
      </div>
      <div className="section-divider w-full text-center mt-[12vw] uppercase text-[3vw] font-semibold">
        keep discovering
      </div>
    </section>
  )
}

export default PhilosophySection