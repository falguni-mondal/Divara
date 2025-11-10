import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react';

const OtherInputs = ({ otherInfo, setOtherInfo }) => {
    const [showOption, setShowOption] = useState(false);
    const optionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (optionRef.current && !optionRef.current.contains(e.target)) {
                setShowOption(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])

    return (
        <div className='other-info-input-container w-full grid grid-cols-2 gap-4'>
            <div onClick={() => setOtherInfo(prev => ({ ...prev, featured: !prev.featured }))} className="product-inp-container flex items-center gap-1 w-fit">
                <span className='w-[20px] aspect-square rounded-[3px] border border-[#1a1a1a] flex items-center justify-center'>
                    <Icon className={`${!otherInfo.featured && "hidden"}`} icon="ic:baseline-check" />
                </span>
                <p className='product-inp-label block text-sm font-semibold'>Featured</p>
            </div>
            <div onClick={() => setOtherInfo(prev => ({ ...prev, newArrival: !prev.newArrival }))} className="product-inp-container flex items-center gap-1 w-fit">
                <span className='w-[20px] aspect-square rounded-[3px] border border-[#1a1a1a] flex items-center justify-center'>
                    <Icon className={`${!otherInfo.newArrival && "hidden"}`} icon="ic:baseline-check" />
                </span>
                <p className='product-inp-label block text-sm font-semibold'>New Arrival</p>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor="product-shipping-price-inp">Shipping Cost</label>
                <div className="input-container relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">₹</span>
                    <input className='product-inp w-full bg-zinc-200 p-3 pl-6 rounded-[3px] outline-0 border-0' type="number" id="product-shipping-price-inp" name='shippingCost' />
                </div>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor="product-shipping-price-inp">Status</label>
                <div className="input-container relative">
                    <div ref={optionRef} onClick={() => setShowOption(prev => !prev)} className="product-status-preview capitalize w-full py-3 bg-zinc-200 rounded-[3px] pl-3 relative">
                        {otherInfo.status}
                        <Icon className="absolute top-1/2 right-3 -translate-y-1/2 -rotate-90" icon="material-symbols:arrow-back-ios-rounded" />
                    </div>
                    <ul className={`product-status-option-container absolute w-full left-0 top-[110%] bg-zinc-200 rounded-[3px] overflow-hidden ${!showOption && "hidden"}`}>
                        {
                            ["draft", "active", "inactive"].map(opt => (
                                <li key={`${opt}-status-key`} onClick={() => setOtherInfo(prev => ({...prev, status: opt}))} className='product-status-option py-2 px-3 hover:bg-[#1a1a1a] hover:text-zinc-200 transition-all duration-300 capitalize'>
                                    {
                                        opt
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OtherInputs
