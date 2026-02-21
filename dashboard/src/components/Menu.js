import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logout } = useContext(GeneralContext);

  const fullName = user?.name?.trim() || "User";
  const firstName = fullName.split(" ")[0] || "User";
  const email = user?.email || "";

  // Avatar: first letter of name
  const avatarLetter = fullName.charAt(0).toUpperCase();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsDropdownOpen(false);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>

          <li>
            <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>

          <li>
            <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>

          <li>
            <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>

          <li>
            <Link to="/apps" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Profile */}
        <div
          className="profile"
          onClick={() => setIsDropdownOpen((v) => !v)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div className="avatar">{avatarLetter}</div>
          <p className="username">{firstName}</p>

          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "120%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 8,
                width: 220,
                padding: 12,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                zIndex: 999,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 600 }}>{fullName}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{email}</div>
              </div>

              <button
                className="btn btn-grey"
                style={{ width: "100%" }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;