import React, { useState } from 'react'
import PageRouter from '../routers/PageRouter'
import Navbar from './navbar/Navbar'
import Navmenu from './navbar/Navmenu'

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const navMenuController = () =>{
    setShowNav(prev => !prev);
  }
  return (
    <div className='container w-full'>
      <Navbar showNav={showNav} navMenuController = {navMenuController} />
      <Navmenu showNav={showNav} navMenuController={navMenuController}/>
      <main>
        <PageRouter />
      </main>
    </div>
  )
}

export default App