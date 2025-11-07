import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from "@iconify/react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/features/user/authSlice';

const AdminNavs = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navs = [
    {
      title: "dashboard",
      icon: "iconamoon:category",
      path: "/admin",
    },
    {
      title: "users",
      icon: "iconamoon:profile",
      path: "/admin/users",
    },
    {
      title: "products",
      icon: "iconamoon:badge",
      path: "/admin/products",
    },
    {
      title: "orders",
      icon: "iconamoon:delivery",
      path: "/admin/orders",
    },
    {
      title: "bags",
      icon: "iconamoon:shopping-bag",
      path: "/admin/bags",
    },
    {
      title: "wishlists",
      icon: "iconamoon:heart",
      path: "/admin/wishlists",
    },
  ]
  return (
    <div className='w-full h-[50px] rounded-[10px 0px 0px 0px] bg-[#f8f8f8] fixed bottom-0 left-1/2 -translate-x-1/2 z-[999]' id='admin-navbar'>
      <nav className='w-full h-full flex items-center justify-between px-3'>
        {
          navs.map(({title, icon, path}) => (
            <NavLink to={path}>
              <Icon icon={location.pathname === path? `${icon}-duotone` : `${icon}-light`} className={`text-[1.5rem] ${location.pathname === path ? "text-[#5f5dc7]" : "text-[#1a1a1a]"}`}/>
            </NavLink>
          ))
        }
        <span onClick={() => dispatch(logoutUser())}>
          <Icon icon="iconamoon:exit-light" className={`text-[1.5rem] text-red-700`}/>
        </span>
      </nav>
    </div>
  )
}

export default AdminNavs
