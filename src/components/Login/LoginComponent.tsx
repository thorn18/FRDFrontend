import React, { SyntheticEvent, useState, useEffect } from 'react';
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css';
import { useForm, SubmitHandler } from "react-hook-form";
import UserService from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../store/postReducer';

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
    }
    const { register, handleSubmit } = useForm<FormValues>();
    const dispatch = useDispatch();
    let history = useHistory();
    let token: string = useSelector((state: AppState) => state.userState.token);

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        //Axios call goes here.
        dispatch(UserService.login(formData.username, formData.password));
    }

    useEffect(() => {
        //if token exists, we have already logged in
        //redirect to home
        if (token) {
            // console.log(`token: ${token}`);
            history.push('/home');
        }
    });

    return (
        <div id="loginForm" data-testid="loginForm">
            <img src={pixelgramlogo} id="pixelImage" alt="pixelgram logo"></img>
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
    )
}
export default LoginComponent;