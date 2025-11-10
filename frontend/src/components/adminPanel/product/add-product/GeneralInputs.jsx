import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const GeneralInputs = ({ selectedSize, setSelectedSize, sizes, generalInfo, setGeneralInfo }) => {
    const categoryRef = useRef(null);
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target)) {
                setShowOption(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])

    const isSizeFilled = (sizeValue) => {
        const sizeData = sizes.find(s => s.value === sizeValue);
        if (!sizeData) return false;

        return sizeData.available;
    };

    const getSizeBg = (size) => {
        if (selectedSize === size) {
            return isSizeFilled(size) ? 'bg-[#9a88ff] text-[#fefefe]' : 'bg-[#dbd4ff]';
        }
        return isSizeFilled(size) ? 'bg-[#9a88ff] text-[#fefefe]' : 'bg-zinc-200';
    };

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

            <div className="product-inp-container w-full mt-2">
                <label className='product-inp-label text-sm font-semibold mb-2'>Category</label>
                <div className="input-container relative">
                    <div ref={categoryRef} onClick={() => setShowOption(prev => !prev)} className="product-status-preview capitalize w-full py-3 bg-zinc-200 rounded-[3px] pl-3 relative">
                        {generalInfo.category || "select category"}
                        <Icon className="absolute top-1/2 right-3 -translate-y-1/2 -rotate-90" icon="material-symbols:arrow-back-ios-rounded" />
                    </div>
                    <ul className={`product-status-option-container absolute w-full left-0 top-[110%] bg-[#e0e0e0be] backdrop-blur-md rounded-[3px] overflow-hidden max-h-[130px] overflow-y-scroll m-0 p-0 ${!showOption && "hidden"} z-[99]`}>
                        {
                            ["dresses", "knitwear", "outerwear", "t-shirts", "shirts & tops", "denim wears", "jackets & coats", "leather clothing"].map(opt => (
                                <li key={`${opt}-status-key`} onClick={() => setGeneralInfo(prev => ({ ...prev, category: opt }))} className='product-status-option py-2 px-3 hover:bg-[#1a1a1a] hover:text-zinc-200 transition-all duration-300 capitalize'>
                                    {
                                        opt
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="product-inp-container w-full mt-4">
                <div className="product-inp-label-container w-full mb-2">
                    <p className='product-inp-label text-sm font-semibold'>Select Size</p>
                    <p className='product-inp-sub-label text-xs text-zinc-500'>Pick Available Size</p>
                </div>
                <div className="product-size-selector-container w-full h-[3rem] flex justify-between">
                    {
                        ["xs", "s", "m", "l", "xl"].map(s => (
                            <span onClick={() => setSelectedSize(s)} key={`${s}size-key`} className={`product-size-${s} h-full aspect-square rounded-[3px] flex items-center justify-center uppercase ${getSizeBg(s)}`}>
                                {s}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GeneralInputs
