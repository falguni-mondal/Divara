import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

import SectionHeading from '../../utils/SectionHeading'

import testImg from "../../../assets/test/main.webp";
import ShopItem from './ShopItem';

const ShopSection = () => {
    const item = {
        title: "Lorem Ipsum Dolor 32'",
        img: testImg
    }
    return (
        <section className='mt-[15vw] relative w-full' id='shop-section'>
            <div className="shop-heading">
                <SectionHeading text="Discover Timeless Luxury" />
            </div>
            <div className="main-shop mt-[4vw]">
                <div className='sticky top-0 bg-[#f6f6f6] px-[5vw] flex justify-between py-[3vw] text-[3.3vw] font-semibold uppercase' id="shop-nav">
                    <span className='underline flex items-center gap-[1vw]'>Filters<IoIosArrowDown /></span>
                    <span className='underline flex items-center gap-[1vw]'>Sort By<IoIosArrowDown /></span>
                </div>
                <div className="shop-items-container w-full px-[5vw] pt-[4vw]">
                    <ul className='flex justify-between flex-wrap w-full'>
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                        <ShopItem item={item} />
                    </ul>
                </div>
                <span className="see-more-btn uppercase bg-[]">
                    See More
                </span>
            </div>
        </section>
    )
}

export default ShopSection