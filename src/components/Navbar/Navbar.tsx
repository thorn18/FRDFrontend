import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { IconContext } from "react-icons";
import { BsPerson, BsSearch } from "react-icons/bs";
import Logo from "../../images/logo.svg";
import addIcon from "../../images/addIcon.svg";
import "./Navbar.css";
import { logoutUser } from "../../store/userActions";
import { AppState } from "../../store/postReducer";

const Navbar = () => {
  const [isMenuOpen, setMenu] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [input, setInput] = useState('');

  const loggedIn: boolean = useSelector((state: AppState) => state.userState.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
 
  const setLoginButton = () => {
    setToggleButton(!toggleButton);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  function loginButton() {
    setMenu(!isMenuOpen);
    setLoginButton();
    history.push('/login');
  }

  function logoutButton() {
    setMenu(!isMenuOpen);
    setLoginButton();
    localStorage.clear();
    dispatch(logoutUser());
    history.push('/home');
  }

  return (
    <nav data-testid="navbar" id="navbar">
      <div className="div1" onClick={() => history.push('/home')}>
        <img className="nav_logo" data-testid="nav-logo" src={Logo} alt="Nav Logo" />
      </div>
      
      <div className="div2">
        {location.pathname !== '/login' && 
          <div className="wrapper">
            <BsSearch className="searchIcon" />
            <input
              type="search"
              onChange={handleChange}
              value={input}
              placeholder="Search"
              className="input"
              data-testid="search-bar"
            />
          </div> 
        }
      </div>

      <div className="div3">
        {location.pathname !== '/login' &&
          <div  data-testid='navbarContainer'>
            <IconContext.Provider value={{ size: "2em" }}>
              <div className="nav-action-items">
                {(loggedIn === true) ? <>
                  <button
                    onClick={() => {
                      history.push('/newpost')
                    }}
                    data-tip
                    data-for='addPostTip'
                    data-testid="post-btn"
                    className="nav_addIcon"><img className="nav_addImg" src={addIcon} alt='Add a new post' /></button>
                  <ReactTooltip id='addPostTip' place='top' effect='solid'>Add a new post</ReactTooltip>
                </> : <button data-testid="placeholder-btn" className="nav_placeholder"></button>}
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

                    {(toggleButton && !loggedIn)
                      ? <button
                        disabled={isMenuOpen ? false : true}
                        data-testid="login-link"
                        className="logButton"
                        onClick={() => { loginButton() }}
                      >
                        Login
                    </button>
                      : null
                    }
                    {(toggleButton && loggedIn)
                      ? <button
                        disabled={isMenuOpen ? false : true}
                        data-testid="logout-link"
                        className="logButton"
                        onClick={() => { logoutButton() }}
                      >
                        Logout
                    </button>
                      : null
                    }
                  </div>
                </article>
              </div>
            </IconContext.Provider>
          </div>
        }
      </div>
    </nav >
  );
};

export default Navbar;
