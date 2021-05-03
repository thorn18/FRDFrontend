import React from 'react';
import User from '../../models/user';
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css'

interface userProps {
    user: User;
}

function LoginComponent(props: userProps) {


    return (
        <div id="loginForm">
            <div className = "loginInnerDiv">
                <img src={pixelgramlogo} id="pixelImage"></img>
                <form>
                    <input className="inputBox" id="username" type="text" aria-label="Username: " placeholder="Username"></input>
                    <input className="inputBox" id="password" type="password" aria-label="Password: " placeholder="Password"></input>
                    <div id="actionButtonContainer">
                        <button className="register-button">Register</button>
                        <button className="login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default LoginComponent;