import React from 'react';
import User from '../../models/user';
import pixelgramlogo from '../../pixelgram-logo.png'
import 'LoginComponent.css'

interface userProps {
    user: User;
}

function LoginComponent(props: userProps) {


    return (
        <div className = "loginForm">
            <img src={pixelgramlogo}></img>
            <form>
                <text id = "textTag">Username:</text>
                <input id = "username" type = "text"></input>
                <text id  = "passText">Password:</text>
                <input id = "password" type = "password"></input>
            </form>
        </div>
    )

}
export default LoginComponent;