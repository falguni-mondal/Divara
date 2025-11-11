import { Icon } from "@iconify/react";

const PricingInputs = ({ sizes, setSizes, selectedSize, errors }) => {

    const currentSizeData = sizes.find(s => s.value === selectedSize) || {};

    const sizeDataUpdater = (name, value) => {
        setSizes(prev => prev.map(sizeObj => {
            if (sizeObj.value === selectedSize) {
                const updatedSize = {
                    ...sizeObj,
                    [name]: value === "" ? 0 : Math.round(Number(value))
                };

                updatedSize.available = (
                    updatedSize.originalPrice > 0 &&
                    updatedSize.discount >= 0 &&
                    updatedSize.stock > 0
                );

                return updatedSize;
            }
            return sizeObj;
        }));
    }

    return (
        <div key={selectedSize} className='product-pricing-input-container w-full grid grid-cols-2 gap-4'>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor={`${selectedSize}-price-input`}>Base Price</label>
                <div className="input-container relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">₹</span>
                    <input onChange={(e) => sizeDataUpdater("originalPrice", e.target.value)} onWheel={(e) => e.target.blur()} className='product-inp w-full bg-zinc-200 p-3 pl-6 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-price-input`} defaultValue={currentSizeData?.originalPrice} />
                </div>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2' htmlFor={`${selectedSize}-discount-input`}>Discount</label>
                <div className="input-container relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">%</span>
                    <input onChange={(e) => sizeDataUpdater("discount", e.target.value)} onWheel={(e) => e.target.blur()} className='product-inp w-full bg-zinc-200 p-3 pl-7 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-discount-input`} defaultValue={currentSizeData?.discount} />
                </div>
            </div>
            <div className="product-inp-container w-full">
                <label className='product-inp-label text-sm font-semibold mb-2 block' htmlFor={`${selectedSize}-stock-input`}>Stock</label>
                <input onChange={(e) => sizeDataUpdater("stock", e.target.value)} onWheel={(e) => e.target.blur()} className='product-inp w-full bg-zinc-200 p-3 rounded-[3px] outline-0 border-0' type="number" id={`${selectedSize}-stock-input`} defaultValue={currentSizeData?.stock} />
            </div>
            {
                errors[selectedSize].length > 0 &&
                <div className={`product-${selectedSize}-size-err-container w-full bg-white rounded-lg p-3 col-span-2`}>
                    <ul className="w-full m-0 p-0 text-red-700 text-xs flex flex-col gap-2">
                        {
                            errors[selectedSize].map(err => (
                                <li key={`${selectedSize}-${err}-key`} className="flex gap-1 items-start leading-none">
                                    <Icon icon="material-symbols:error-circle-rounded" />
                                    <p>{err}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default PricingInputs
