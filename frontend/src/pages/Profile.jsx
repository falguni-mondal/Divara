import { useDispatch } from 'react-redux'
import { logoutUser, resetEmailStatus } from '../store/features/user/authSlice';
import { useEffect } from 'react';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEmailStatus());
  }, [])
  
  const logoutHandler = () => {
    dispatch(logoutUser());
    // window.location.href= "/account";
  }
  return (
    <div className='p-10'>
      <button onClick={logoutHandler} className='px-5 py-2 rounded-[2px] bg-[#0f0f0f] text-[#efefef]'>Sign Out</button>
    </div>
  )
}

export default Profile