import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="media/images/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0 ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link z-navlink" to="/auth">
                Sign in
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link z-navlink" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link z-navlink" to="/product">
                Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link z-navlink" to="/pricing">
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link z-navlink" to="/support">
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;