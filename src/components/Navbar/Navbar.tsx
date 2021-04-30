import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsPerson, BsSearch } from "react-icons/bs";
import Logo from "../../images/logo.svg";
import addIcon from "../../images/addIcon.svg";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [input, setInput] = useState('');

  const setLoginButton = () => {
    setToggleButton(!toggleButton);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <nav  data-testid="navbar" id="navbar">
      <img className="nav_logo" src={Logo} alt="Nav Logo" />

      <div  className="wrapper">
        <BsSearch className="searchIcon" />
        <input
          type="search"
          onChange={handleChange}
          value={input}
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
              <button
                data-testid="toggle-btn"
                onClick={setLoginButton}
                className="clearBButton"
              >
                <BsPerson />
              </button>

              {toggleButton
                ? <button
                  disabled={isMenuOpen ? false : true}
                  data-testid="login-link"
                  className="loginButton"
                  onClick={() => setMenu(!isMenuOpen)}
                >
                  Login
                  </button>
                : null
              }
            </div>
          </article>
        </div>
      </IconContext.Provider>
    </nav>
  );
};

export default Navbar;
