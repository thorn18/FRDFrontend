import React, { SyntheticEvent } from 'react'
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css';
import { useForm, SubmitHandler } from "react-hook-form";
import UserService from '../../services/userService'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../store/postReducer';


type FormValues = {
    username: string;
    password: string;
};

function LoginComponent() {

    const { register, handleSubmit } = useForm<FormValues>();
    const dispatch = useDispatch();
    let history = useHistory();
    let token: string = useSelector((state: AppState) => state.userState.token);

    const onSubmit: SubmitHandler<FormValues> = async(formData) => {
        //Axios call goes here.
        await dispatch(UserService.login(formData.username, formData.password));
        //If login was successful, redirect to home
        if (token) {
            history.push('/home');
        }
    }
    function handleKeyDown(e: SyntheticEvent) {
        if (e.type === 'Enter') {
            history.push('/home')
        }
    }

    return (
        <div id="loginForm" data-testid="loginForm">
            <img src={pixelgramlogo} id="pixelImage"></img>
            <form onSubmit={handleSubmit(onSubmit)} data-testid="loginFormForm" onKeyDown={(e) => handleKeyDown(e)}>
                <input  {...register("username")} className="inputBox" id="username" type="text" aria-label="Username: " placeholder="Username" />
                <input {...register("password")} className="inputBox" id="password" type="password" aria-label="Password: " placeholder="Password" />
                <div id="actionButtonContainer">
                    <button className="register-button" data-testid="registerbutton">Register</button>
                    <input type="submit" className="login-button" data-testid="loginbutton" value="Login" />
                </div>
            </form>
        </div>
    )

}
export default LoginComponent;