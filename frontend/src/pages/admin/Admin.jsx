import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetEmailStatus } from '../../store/features/user/authSlice';
import AdminNavs from '../../components/adminPanel/AdminNavs';
import AdminRouter from '../../routers/AdminRouter';

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEmailStatus());
  }, [])
  return (
    <div className='w-full pt-[80px] px-3' id='admin-panel'>
      <AdminNavs />
      <AdminRouter />
    </div>
  )
}

export default Admin
