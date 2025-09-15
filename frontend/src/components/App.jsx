import React, { useEffect, useState } from 'react'
import PageRouter from '../routers/PageRouter'
import Navbar from './navbar/Navbar'
import Navmenu from './navbar/Navmenu'
import Footer from './footer/Footer'
import { useLocation } from 'react-router-dom'

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const pathLocation = useLocation();

  const navMenuController = () =>{
    setShowNav(prev => !prev);
  }

  useEffect(() => {
    window.scrollTo(0,0);
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth"
    // });
  }, [pathLocation])

  return (
    <div className='container w-full'>
      <Navbar showNav={showNav} navMenuController = {navMenuController} />
      <Navmenu showNav={showNav} navMenuController={navMenuController}/>
      <main>
        <PageRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App