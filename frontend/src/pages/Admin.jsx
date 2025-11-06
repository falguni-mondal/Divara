import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser, resetEmailStatus } from '../store/features/user/authSlice';
import Dashboard from '../components/adminPanel/dashboard/Dashboard';

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEmailStatus());
  }, [])
  return (
    <div className='w-full pt-[60px] px-5' id='admin-panel'>
      <Dashboard />
      <button onClick={() => dispatch(logoutUser())} className='text-red-700 underline'>Sign Out</button>
    </div>
  )
}

export default Admin
