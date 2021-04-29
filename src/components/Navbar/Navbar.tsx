import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsPerson, BsSearch } from "react-icons/bs";
import Logo from "../../images/logo.svg";
import addIcon from "../../images/addIcon.svg";
import loginIcon from "../../images/loginIcon.png";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  return (
    <nav data-testid="navbar" id="navbar">
      <img className="nav_logo" src={Logo} alt="Nav Logo" />

      <div className="wrapper">
        <BsSearch className="searchIcon" />
        <input
          type="search"
          value="Search"
          placeholder="Search"
          className="input"
        />
      </div>

      <IconContext.Provider value={{ size: "2em" }}>
        <div className="nav-action-items">
          <img className="nav_addIcon" src={addIcon} alt="Nav Logo" />
          <article
            data-testid="login-menu"            
            onClick={() => setMenu(!isMenuOpen)}
          >
            <div className="login-menu">
              {/* <img className="nav_loginIcon" src={loginIcon} alt="Nav Login Icon" /> */}
              <BsPerson />
              <button
                disabled={isMenuOpen ? false : true}
                data-testid="login-link"
                className={isMenuOpen ? "open" : "closed"}
                onClick={() => setMenu(!isMenuOpen)}
              >
                Login
              </button>
            </div>
          </article>
        </div>
      </IconContext.Provider>
    </nav>
  );
};

export default Navbar;
