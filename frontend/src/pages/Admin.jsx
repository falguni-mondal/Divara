import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser, resetEmailStatus } from '../store/features/user/authSlice';
import Dashboard from '../components/adminPanel/dashboard/Dashboard';
import AdminNavs from '../components/adminPanel/AdminNavs';

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEmailStatus());
  }, [])
  return (
    <div className='w-full pt-[80px] px-3' id='admin-panel'>
      <AdminNavs />
      <Dashboard />
    </div>
  )
}

export default Admin
