import React from 'react'
import { Link } from 'react-router-dom'

const ShopItem = ({ item }) => {
    return (
        <li className='w-[48%] mb-[6vw]'>
            <Link to={`/shop/${item._id}`}>
                <img className='w-full' src={item.img} alt="" />
                <p className='text-[3.3vw] mt-[1vw]'>{item.title}</p>
            </Link>
        </li>
    )
}

export default ShopItem