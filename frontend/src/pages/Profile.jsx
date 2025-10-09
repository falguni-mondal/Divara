import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/features/user/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
  return (
    <div className='p-10'>
        <button onClick={() => dispatch(logoutUser())} className='px-5 py-2 rounded-[2px] bg-[#0f0f0f] text-[#efefef]'>Sign Out</button>
    </div>
  )
}

export default Profile