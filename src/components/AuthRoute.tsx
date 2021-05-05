import React, { Component } from 'react'; 
import { Redirect, Route, RouteProps } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

interface tokenInfo{
    nameid: string;
    nbf: number;
    exp: number;
    iat: number
}
const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest}) => {
    let id_token = localStorage.getItem("id_token");
    if (id_token !== null) {
        let decodedToken: tokenInfo = jwt_decode(id_token)
        let isValid = decodedToken.exp*1000 > Date.now();
        if (isValid) {
            console.log('Token is still valid')
            return(
                <Route { ...rest } />
            )
        } else {
            console.log('Token expired')
            return(
                <Redirect to={{ pathname: '/login' }} />
            )
        }
    } else {
        console.log('No Token found')
        return (
            <Redirect to={{ pathname: '/login' }} />
        )
    }
}

export default AuthRoute;
