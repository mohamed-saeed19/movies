import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MediaItem from "./Components/MediaItem/MediaItem";
import MovieContextProvider from "./Components/Context/Store";

function App() {
  const [userData, setUserData] = useState(null);
  const [favourites, setfavourites] = useState([]);
  const [favouriteSeries, setfavouriteSeries] = useState([]);
  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={userData} LogOut={LogOut} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData} saveUserData={saveUserData}>
              {" "}
              <Home favourites={favourites} setfavourites={setfavourites} favouriteSeries={favouriteSeries} setfavouriteSeries={setfavouriteSeries}/>
            </ProtectedRoute>
          ),
        },
        // {path: "movies",  element: (<ProtectedRoute userData={userData} saveUserData={saveUserData}><Movies favourites={favourites} setfavourites={setfavourites} /></ProtectedRoute>),},
        // {path:"people",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><People /></ProtectedRoute>},
        // {path:"tv",element:<ProtectedRoute userData={userData} saveUserData={saveUserData}><Tv /></ProtectedRoute>},
        {
          path: "mediaItem/:id/:mediaType",
          element: (
            <ProtectedRoute userData={userData} saveUserData={saveUserData}>
              <MediaItem />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "about",
          element: (
            <ProtectedRoute userData={userData} saveUserData={saveUserData}>
              <About favourites={favourites} setfavourites={setfavourites} favouriteSeries={favouriteSeries} setfavouriteSeries={setfavouriteSeries}/>
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  function LogOut() {
    localStorage.removeItem("token");
    setUserData(null);

    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      saveUserData();
    }
  }, []);
  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;
