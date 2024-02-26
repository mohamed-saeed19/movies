import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout({userData ,LogOut}) {
  return <>
  <Navbar userData={userData} LogOut={LogOut}/>

<div className="container">
<Outlet>
</Outlet>
</div>
  <Footer/>
  </>
}
