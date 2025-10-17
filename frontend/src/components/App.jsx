import { useEffect, useState } from 'react';
import PageRouter from '../routers/PageRouter';
import Navbar from './navbar/Navbar';
import Navmenu from './navbar/Navmenu';
import Footer from './footer/Footer';
import { useLocation } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/features/user/authSlice';
import LoadingScreen from '../utils/loading/LoadingScreen';


const App = () => {
  const [load, setLoad] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const navMenuController = () => {
    setShowNav(prev => !prev);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth"
    // });
  }, [location])

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])
  

  useEffect(() => {
    window.addEventListener("load", ()=>{
      setLoad(true);
    })
  },[])

  return (
    !load ?
    <LoadingScreen />
    :
    <div className='container w-full'>
      <Navbar showNav={showNav} navMenuController={navMenuController} />
      <Navmenu showNav={showNav} navMenuController={navMenuController} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <main>
        <PageRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App