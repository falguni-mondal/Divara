import { Icon } from '@iconify/react'
import { useState } from 'react'

const ImageInput = ({ images, setImages }) => {
  const [imgPreview, setImgPreview] = useState([null, null, null, null, null]);

  const imageSelector = (index) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const previewUrl = URL.createObjectURL(file)
        
        const newPreviews = [...imgPreview]
        newPreviews[index] = previewUrl
        setImgPreview(newPreviews)
        
        const newImages = [...images]
        newImages[index] = file
        setImages([...newImages])
      }
    }
    
    input.click()
  }

  return (
    <div className='w-full' id='add-product-img-input'>
      <div onClick={() => imageSelector(0)} className="primary-product-img-input w-full aspect-square rounded-[3px] overflow-hidden bg-zinc-200 text-zinc-400 text-7xl flex justify-center items-center">
        {
          imgPreview[0] ?
          <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={imgPreview[0]} alt="" />
          :
          <Icon icon="material-symbols:add-photo-alternate" />
        }
      </div>

      <div className="secondary-product-img-input w-full h-[75px] flex justify-between mt-4">
        <div onClick={() => imageSelector(1)} className="secondary-prod-img-1 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
          {
          imgPreview[1] ?
          <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={imgPreview[1]} alt="" />
          :
          <Icon icon="material-symbols:add-photo-alternate" />
        }
        </div>
        <div onClick={() => imageSelector(2)} className="secondary-prod-img-2 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
          {
          imgPreview[2] ?
          <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={imgPreview[2]} alt="" />
          :
          <Icon icon="material-symbols:add-photo-alternate" />
        }
        </div>
        <div onClick={() => imageSelector(3)} className="secondary-prod-img-3 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
          {
          imgPreview[3] ?
          <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={imgPreview[3]} alt="" />
          :
          <Icon icon="material-symbols:add-photo-alternate" />
        }
        </div>
        <div onClick={() => imageSelector(4)} className="secondary-prod-img-4 h-full aspect-square rounded-[3px] bg-zinc-200 flex items-center justify-center text-zinc-400 text-2xl">
          {
          imgPreview[4] ?
          <img className='w-full h-full object-cover hover:scale-110 transition-all duration-500' src={imgPreview[4]} alt="" />
          :
          <Icon icon="material-symbols:add-photo-alternate" />
        }
        </div>
      </div>
    </div>
  )
}

export default ImageInput
