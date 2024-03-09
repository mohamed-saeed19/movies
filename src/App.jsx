import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import Navbar from './Components/Navbar/Navbar';
import People from './Components/People/People';
import Register from './Components/Register/Register';
import Tv from './Components/Tv/Tv';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import About from './Components/About/About';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MediaItem from './Components/MediaItem/MediaItem';


function App() {
const [userData, setUserData] = useState(null)
const [favourites, setfavourites] = useState([]);
  function saveUserData(){
  let encodedToken=  localStorage.getItem('token');
  let decodedToken= jwtDecode(encodedToken);
setUserData(decodedToken);
}

let routers=createBrowserRouter([
  {path:'/',element:<Layout userData={userData} LogOut={LogOut}/>,children:[
    {index:true,element:<ProtectedRoute userData={userData} saveUserData={saveUserData}> <Home favourites={favourites} setfavourites={setfavourites} /></ProtectedRoute> },
    // {path:"movies",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><Movies /></ProtectedRoute>},
    // {path:"people",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><People /></ProtectedRoute>},
    // {path:"tv",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><Tv /></ProtectedRoute>},
    {path:"mediaItem/:id/:mediaType",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><MediaItem /></ProtectedRoute>},
    {path:"login",element:<Login saveUserData={saveUserData} />},
    {path:"register",element:<Register />},
    {path:"about",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><About /></ProtectedRoute>},
    {path:'*',element:<NotFound/>}
    ]}
])

function LogOut(){
localStorage.removeItem('token');
setUserData(null);

return <Navigate to='/login'/>
}

useEffect(()=>{
  if (localStorage.getItem('token')!==null) {
    saveUserData()
  }
},[])
  return <>

<RouterProvider router={routers} />
</>;
}

export default App;
