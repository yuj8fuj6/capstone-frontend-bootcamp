import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import {
  BsPerson,
  BsHeadset,
  BsNewspaper,
  BsPinMapFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

const navbarMenuItems = [
  { page: "/profile", text: "Profile", icon: <BsPerson /> },
  { page: "/support", text: "Support", icon: <BsHeadset /> },
  { page: "/circular", text: "Circular", icon: <BsNewspaper /> },
  { page: "/map", text: "Map", icon: <BsPinMapFill /> },
];

const NavBar = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <nav className="navbar">
      <Link to="/main">
        <img
          src={require("../assets/app_logo_small.png")}
          alt="app-logo-page"
          className="w-[80px] h-24 drop-shadow-xl mt-5"
        />
      </Link>
      <ul className="menu menu-horizontal px-1">
        {navbarMenuItems.map((item) => (
          <li>
            <Link to={item.page} className="justify-center-link pl-5">
              <div className="text-4xl drop-shadow-sm">{item.icon}</div>
              <div className="text-xs drop-shadow-sm font-semibold">
                {item.text}
              </div>
            </Link>
          </li>
        ))}
        <li>
          <button className="justify-center-link pl-5" onClick={handleLogout}>
            <div className="text-4xl drop-shadow-sm">
              <BsBoxArrowRight />
            </div>
            <div className="text-xs drop-shadow-sm font-semibold">Logout</div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
