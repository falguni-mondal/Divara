import React from 'react'

const GeneralInputs = () => {
    return (
        <div className='general-info-input-container w-full'>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor="product-name-inp">Product Name</label>
                <input className='product-inp w-full bg-zinc-200 p-3 rounded-[3px] outline-0 border-0' type="text" id='product-name-inp' name='name' />
            </div>

            <div className="product-inp-container w-full mt-4">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor="product-desc-inp">Product Description</label>
                <textarea className='bg-zinc-200 w-full rounded-[3px] resize-none border-0 outline-0 p-3' name="description" id="product-desc-inp" rows={7}></textarea>
            </div>

            <div className="product-inp-container w-full mt-4">
                <div className="product-inp-label-container w-full mb-2">
                    <p className='product-inp-label text-sm font-semibold'>Select Size</p>
                    <p className='product-inp-sub-label text-xs text-zinc-500'>Pick Available Size</p>
                </div>
                <div className="product-size-selector-container w-full h-[3rem] flex justify-between">
                    <span className="product-size-xs h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center uppercase">
                        xs
                    </span>
                    <span className="product-size-s h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center uppercase">
                        s
                    </span>
                    <span className="product-size-m h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center uppercase">
                        m
                    </span>
                    <span className="product-size-l h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center uppercase">
                        l
                    </span>
                    <span className="product-size-xl h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center uppercase">
                        xl
                    </span>
                </div>
            </div>
        </div>
    )
}

export default GeneralInputs
