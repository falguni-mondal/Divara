import React from 'react'

const LuxuryItem = ({ item }) => {
    return (
        <li>
            <div className="luxury-visual-content w-[75vw] h-[75vw]">
                {
                    item.image ?
                        <img className='luxury-item-image w-full h-full object-cover' src={item.image} alt="" />
                        :
                        <video className='luxury-item-image w-full h-full object-cover' src={item.video} autoPlay loop muted></video>
                }
            </div>
            <div className="luxury-text-content mt-[5vw]">
                <h3 className="luxury-item-heading uppercase text-[3vw] mb-[3vw] font-semibold">{item.heading}</h3>
                <p className="luxury-item-pragraph text-[4vw] font-[300]">{item.paragraph}</p>
            </div>
        </li>
    )
}

export default LuxuryItem