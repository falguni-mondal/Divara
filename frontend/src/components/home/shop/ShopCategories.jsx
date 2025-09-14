import React from 'react'
import SectionHeading from '../../utils/SectionHeading'
import ShopCategory from './ShopCategory'

import saree from "../../../assets/images/saree_poster.webp"
import dress from "../../../assets/images/dress_poster.webp"
import denim from "../../../assets/images/denim_poster.webp"
import shirt from "../../../assets/images/shirt_poster.webp"

function ShopCategories() {
    const categoryItems = [
        {
            title : "Sarees",
            poster: saree,
            path: "saree",
        },
        {
            title : "Dresses",
            poster: dress,
            path: "dress",
        },
        {
            title : "Denim Wears",
            poster: denim,
            path: "denim",
        },
        {
            title : "Shirts",
            poster: shirt,
            path: "shirt",
        },
    ]

    return (
        <section className='mt-[18vw] relative w-full' id='shop-category-section'>
            <div className="shop-category-heading">
                <SectionHeading text="Discover Timeless Luxury" />
            </div>
            <div className="shop-category-items-container w-full px-[3vw] pt-[8vw]">
                <ul className='flex justify-between flex-wrap w-full'>
                    {
                        categoryItems.map(item => (
                            <ShopCategory item={item} key={`${item.title}-category-key`}/>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default ShopCategories