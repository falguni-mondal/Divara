import { Icon } from '@iconify/react'

const OtherInputs = ({ otherInfo, setOtherInfo }) => {
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
                    <input onWheel={(e) => e.target.blur()} className='product-inp w-full bg-zinc-200 p-3 pl-6 rounded-[3px] outline-0 border-0' type="number" defaultValue={0} id="product-shipping-price-inp" name='shippingCost' />
                </div>
            </div>
        </div>
    )
}

export default OtherInputs
