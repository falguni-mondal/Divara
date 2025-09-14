import React from 'react'
import { Link } from 'react-router-dom'

const ShopCategory = ({item}) => {
    return (
        <li className='w-[49%] mb-6 shop-category-item'>
            <Link to={`/shop/categories/${item.path}`}>
                <img className='w-full h-[28vh] object-cover transition-all ease-in-out duration-500' src={item.poster} alt="" />
                <p className='w-full text-center text-[3.5vw] mt-3 font-semibold'>{item.title}</p>
            </Link>
        </li>
    )
}

export default ShopCategory