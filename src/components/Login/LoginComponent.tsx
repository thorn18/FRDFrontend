import React, { SyntheticEvent, useState } from 'react';
import User from '../../models/user';
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css';
import { useForm, SubmitHandler } from "react-hook-form";
import UserService from '../../services/userService'
import { useDispatch } from 'react-redux';

export interface Input {
    username: any;
    password: any;
}
type FormValues = {
    username: string;
    password: string;
};

function LoginComponent(): JSX.Element {
    const [input, setInput] = useState<Input>({ username: '', password: '' })
    const [hasUsername, setUsername] = useState<boolean>(false);
    const [hasPassword, setPassword] = useState<boolean>(false);
    const [userInteracted, setUI] = useState(false);
    const [passInteracted, setPI] = useState(false);

    const handleInput = (e: SyntheticEvent) => {
        let newInput = { ...input };

        if ((e.target as HTMLInputElement).name === "username") {
            newInput.username = (e.target as HTMLInputElement).value;
            setInput(newInput);
            if (newInput.username === '') {
                setUsername(false);
                setUI(true);
            } else {
                setUsername(true)
                setUI(true);
            }
        } else if ((e.target as HTMLInputElement).name === "password") {
            newInput.password = (e.target as HTMLInputElement).value;
            setInput(newInput);
            if (newInput.password === '') {
                setPassword(false);
                setPI(true);
            } else {
                setPassword(true)
                setPI(true);
            }
        }

        if (newInput.username === '' && newInput.password === '') {
            setUI(true);
            setPI(true);
            setUsername(false);
            setPassword(false);
        }
    }
    const { register, handleSubmit } = useForm<FormValues>();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FormValues> = formData => {
        //Axios call goes here.
        dispatch(UserService.login(formData.username, formData.password));
        // Get value from form input
        console.log(formData);
    }

    return (
        <div id="loginForm" data-testid="loginForm">
            <div className="loginInnerDiv">
                <img src={pixelgramlogo} id="pixelImage"></img>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="inputBox"
                        id="username"
                        data-testid="username"
                        {...register("username")}
                        name="username"
                        type="text"
                        aria-label="Username: "
                        placeholder="Username"
                        value={input.username}
                        onChange={handleInput} />
                    {hasUsername === false && userInteracted && <p style={{ color: 'red' }} data-testid="usernameWarning">* Username is required</p>}
                    <input
                        className="inputBox"
                        id="password"
                        data-testid="password"
                        {...register("password")}
                        name="password"
                        type="password"
                        aria-label="Password: "
                        placeholder="Password"
                        value={input.password}
                        onChange={handleInput} />
                    {hasPassword === false && passInteracted && <p style={{ color: 'red' }} data-testid="passwordWarning">* Password is required</p>}
                    <div id="actionButtonContainer">
                        <button className="register-button" data-testid="registerbutton">Register</button>
                        <button
                            className="login-button"
                            disabled={hasUsername && hasPassword && userInteracted && passInteracted ? false : true}
                            type="submit"
                            data-testid="loginbutton">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginComponent;