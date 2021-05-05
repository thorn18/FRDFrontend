import React, { SyntheticEvent, useState } from 'react';
import User from '../../models/user';
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css'

export interface Input {
    username: any;
    password: any;
}

function LoginComponent() {
    const [input, setInput] = useState<Input>({ username: '', password: '' })
    const [hasUsername, setUsername] = useState<boolean>(false);
    const [hasPassword, setPassword] = useState<boolean>(false);

    const handleInput = (e: SyntheticEvent) => {
        let newInput = { ...input };

        if ((e.target as HTMLInputElement).name === "username") {
            newInput.username = (e.target as HTMLInputElement).value;
            setInput(newInput);
        } else if ((e.target as HTMLInputElement).name === "password") {
            newInput.password = (e.target as HTMLInputElement).value;
            setInput(newInput);
        }

        if (newInput.username !== '' && newInput.password !== '') {
            setUsername(true);
            setPassword(true);
        }

        if(newInput.username === ''){
            setUsername(false);
        }

        if(newInput.password === ''){
            setPassword(false);
        }
    }
    return (
        <div id="loginForm" data-testid="loginForm">
            <div className="loginInnerDiv">
                <img src={pixelgramlogo} id="pixelImage"></img>
                <form>
                    <input
                        className="inputBox"
                        id="username"
                        data-testid="username"
                        name="username"
                        type="text"
                        aria-label="Username: "
                        placeholder="Username"
                        value={input.username}
                        onChange={handleInput} />
                    <input
                        className="inputBox"
                        id="password"
                        data-testid="password"
                        name="password"
                        type="password"
                        aria-label="Password: "
                        placeholder="Password"
                        value={input.password}
                        onChange={handleInput} />
                    <div id="actionButtonContainer">
                        <button className="register-button" data-testid="registerbutton">Register</button>
                        <button
                            className="login-button"
                            disabled={hasUsername && hasPassword ? false : true}
                            type="submit"
                            data-testid="loginbutton">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default LoginComponent;