import React from 'react'
import collectionImgMob from "../../assets/bg/collection_mobile.webp"
import { Link } from 'react-router-dom'

const CollectionSection = () => {
  return (
    <section className='w-full h-[70vh] relative mt-[18vw] text-zinc-100' id='collection-section'>
        <img className='absolute top-0 left-1/2 -translate-x-1/2 h-full w-[94%] object-cover' src={collectionImgMob} alt="" id="collection-bg-mobile" />
        <div className="collection-link-container relative w-full h-full flex flex-col items-center justify-center">
          <h2 className='text-[6vw] tracking-tight'>Fall Winter 2025</h2>
          <Link to="/collections" className="collection-link-btn text-[3vw] mt-[3vw] font-[500] py-[3vw] px-[6vw] rounded-[3px] bg-[#ffffff15] backdrop-blur-[7px] border border-zinc-100">
            SHOP NOW
          </Link>
        </div>
    </section>
  )
}

export default CollectionSection