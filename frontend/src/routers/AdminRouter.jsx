import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import AdminProducts from '../pages/admin/products/AdminProducts'
import AddProduct from '../pages/admin/products/AddProduct'

const AdminRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<AdminProducts />} />
        <Route path='/products/add' element={<AddProduct />} />
    </Routes>
  )
}

export default AdminRouter
