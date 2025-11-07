import { Icon } from '@iconify/react'
import React from 'react'

const ImageInput = () => {
  return (
    <div className='w-full' id='add-product-img-input'>
      <div className="main-product-img-input w-full aspect-square rounded-[3px] overflow-hidden bg-zinc-200 text-zinc-400 text-7xl flex justify-center items-center">
        <Icon icon="material-symbols:add-photo-alternate" />
      </div>
      <div className="side-product-img-input w-full h-[80px] flex justify-between mt-4">
        <div className="side-prod-img-1 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
            <Icon icon="material-symbols:add-photo-alternate" />
        </div>
        <div className="side-prod-img-2 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
            <Icon icon="material-symbols:add-photo-alternate" />
        </div>
        <div className="side-prod-img-3 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
            <Icon icon="material-symbols:add-photo-alternate" />
        </div>
        <div className="side-prod-img-4 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
            <Icon icon="material-symbols:add-photo-alternate" />
        </div>
      </div>
    </div>
  )
}

export default ImageInput
