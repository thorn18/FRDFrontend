import React from 'react'
import pixelgramlogo from '../../pixelgram-logo.png'
import './LoginComponent.css';
import { useForm, SubmitHandler } from "react-hook-form";
import UserService from '../../services/userService'
import { useDispatch } from 'react-redux';


type FormValues = {
    username: string;
    password: string;
};

function LoginComponent() {

    const { register, handleSubmit } = useForm<FormValues>();
    const dispatch = useDispatch();


    const onSubmit: SubmitHandler<FormValues> = formData => {
        //Axios call goes here.
        dispatch(UserService.login(formData.username,formData.password));
        // Get value from form input
        console.log(formData);
    }

    return (
        <div id="loginForm" data-testid = "loginForm">
            <div className = "loginInnerDiv">
                <img src={pixelgramlogo} id="pixelImage"></img>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <input  {...register("username")} className="inputBox" id="username" type="text" aria-label="Username: " placeholder="Username"/>
                    <input {...register("password")} className="inputBox" id="password" type="password" aria-label="Password: " placeholder="Password"/>
                    <div id="actionButtonContainer">
                        <button className="register-button" data-testid = "registerbutton">Register</button>
                        <input type="submit" className="login-button" data-testid = "loginbutton" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default LoginComponent;