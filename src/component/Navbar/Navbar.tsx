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
        <article
          data-testid="login-menu"
          className="login-menu"
          onClick={() => setMenu(!isMenuOpen)}
        >
          <img className="nav_addIcon" src={addIcon} alt="Nav Logo" />
          <img className="nav_loginIcon" src={loginIcon} alt="Nav Login Icon" />
          <BsPerson />
          <button
            disabled
            data-testid="login-link"
            className={isMenuOpen ? "open" : "closed"}
          >
            <a href="Insert login path" onClick={() => setMenu(!isMenuOpen)}>
              Login
            </a>
          </button>
        </article>
      </IconContext.Provider>
    </nav>
  );
};

export default Navbar;
