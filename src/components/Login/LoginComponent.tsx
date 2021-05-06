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

    const { register, handleSubmit, getValues } = useForm<FormValues>();
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
    async function handleKeyDown(e: any, formData: FormValues) {
        console.log(e);
        console.log(formData);
        if (e.key == 'Enter' ) {
            await dispatch(UserService.login(formData.username, formData.password));
            if (token) {
                history.push('/home');
            }
        }
    }

    return (
        <div id="loginForm" data-testid="loginForm">
            <img src={pixelgramlogo} id="pixelImage"></img>
            <form data-testid="loginFormForm" onKeyDown={(e) => handleKeyDown(e, getValues())}>
                <input  {...register("username")} className="inputBox" id="username" type="text" aria-label="Username: " placeholder="Username" />
                <input {...register("password")} className="inputBox" id="password" type="password" aria-label="Password: " placeholder="Password" />
                <div id="actionButtonContainer">
                    <button className="register-button" data-testid="registerbutton">Register</button>
                    <input type="submit" className="login-button" data-testid="loginbutton" value="Login" onSubmit={handleSubmit(onSubmit)}/>
                </div>
            </form>
        </div>
    )

}
export default LoginComponent;