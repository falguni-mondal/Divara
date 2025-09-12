import React from 'react'

const ShopItem = ({item}) => {
  return (
    <li className='w-[48%] mb-[6vw]'>
        <img className='w-full' src={item.img} alt="" />
        <p className='text-[3.5vw] mt-[1vw]'>{item.title}</p>
    </li>
  )
}

export default ShopItem