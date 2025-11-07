import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

const AddProductNavBtn = () => {
  return (
    <Link to="/admin/products/add" className='fixed bottom-[60px] right-3 w-[2.5rem] aspect-square rounded-[3px] bg-[#1a1a1a] flex justify-center items-center text-[#fefefe] text-[1.3rem]'>
      <Icon icon="iconamoon:sign-plus-light" />
    </Link>
  )
}

export default AddProductNavBtn
