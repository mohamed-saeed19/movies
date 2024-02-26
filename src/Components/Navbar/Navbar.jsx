import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, LogOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-transparent">
        <div className="container-fluid mt-1">
          <Link className="navbar-brand text-light" to="#">
            <h3>NOXE </h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to="/"
                  >
                    <h4>Home</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="movies">
                    <h4>Movies</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="about">
                    <h4>About</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="people">
                    <h4>People</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="tv">
                    <h4>TV</h4>
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-2 d-flex">
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-facebook mx-1 fa-2x"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  {" "}
                  <i className="fab fa-instagram mx-1 fa-2x"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  {" "}
                  <i className="fab fa-twitter mx-1 fa-2x"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  {" "}
                  <i className="fab fa-youtube mx-1 fa-2x"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  {" "}
                  <i className="fab fa-spotify mx-1 fa-2x"></i>
                </a>
              </li>
              {userData ? 
                <li className="nav-item">
                  <div className="d-flex  align-items-center">
                    <span onClick={LogOut} className=" nav-link text-white mx-2">
                      <h4>LogOut</h4> 
                    </span>
                    <span className="mx-2 text-white">
                      <h4>Welcome {userData.first_name}</h4>
                    </span>
                  </div>
                </li>
              : 
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="login">
                      <h4>Login</h4>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="register">
                      <h4>Register</h4>
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
