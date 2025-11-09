import { useEffect, useState } from "react";

const PricingInputs = ({ formData, setFormData, selectedSize }) => {

    const currentSizeData = formData.size.find(s => s.value === selectedSize) || {};

    const sizeDataUpdater = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            size: prev.size.map(sizeObj => {
                if (sizeObj.value === selectedSize) {
                    return (
                        {
                            ...sizeObj,
                            [name]: value === "" ? 0 : Math.round(value),
                            available: value !== "" && value !== 0,
                        }
                    )
                }
                return sizeObj
            })
        }))
    }

    return (
        <div key={selectedSize} className='product-pricing-input-container w-full grid grid-cols-2 gap-4'>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor={`${selectedSize}-price-input`}>Base Price</label>
                <div className="input-container relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">₹</span>
                    <input onChange={sizeDataUpdater} className='product-inp w-full bg-zinc-200 p-3 pl-6 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-price-input`} name='originalPrice' defaultValue={currentSizeData?.originalPrice} />
                </div>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor={`${selectedSize}-discount-input`}>Discount</label>
                <div className="input-container relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">%</span>
                    <input onChange={sizeDataUpdater} className='product-inp w-full bg-zinc-200 p-3 pl-7 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-discount-input`} name='discount' defaultValue={currentSizeData?.discount} />
                </div>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor={`${selectedSize}-stock-input`}>Stock</label>
                <input onChange={sizeDataUpdater} className='product-inp w-full bg-zinc-200 p-3 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-stock-input`} name='stock' defaultValue={currentSizeData?.stock} />
            </div>
        </div>
    )
}

export default PricingInputs
