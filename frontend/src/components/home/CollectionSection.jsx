import React from 'react'
import collectionImgMob from "../../assets/bg/collection_mobile.webp"
import { Link } from 'react-router-dom'

const CollectionSection = () => {
  return (
    <section className='w-full h-[70vh] relative mt-[18vw] text-zinc-100' id='collection-section'>
        <img className='absolute top-0 left-0 h-full w-full object-cover' src={collectionImgMob} alt="" id="collection-bg-mobile" />
        <div className="collection-link-container relative w-full h-full flex flex-col items-center justify-center">
          <h2 className='text-[6vw] tracking-tight'>Fall Winter 2025</h2>
          <Link to="/collections" className="collection-link-btn text-[2.5vw] mt-[3vw] font-semibold py-[3vw] px-[5vw] rounded bg-[#ffffff15] backdrop-blur-[7px] border border-zinc-100">
            EXPLORE NOW
          </Link>
        </div>
    </section>
  )
}

export default CollectionSection