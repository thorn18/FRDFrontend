import React from 'react';
import User from '../../models/user';
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css'


function LoginComponent() {


    return (
        <div id="loginForm" data-testid = "loginForm">
            <div className = "loginInnerDiv">
                <img src={pixelgramlogo} id="pixelImage"></img>
                <form>
                    <input className="inputBox" id="username" type="text" aria-label="Username: " placeholder="Username"></input>
                    <input className="inputBox" id="password" type="password" aria-label="Password: " placeholder="Password"></input>
                    <div id="actionButtonContainer">
                        <button className="register-button" data-testid = "registerbutton">Register</button>
                        <button className="login-button" data-testid = "loginbutton">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default LoginComponent;