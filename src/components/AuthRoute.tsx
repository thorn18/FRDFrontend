import React, { Component } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

interface tokenInfo {
    nameid: string;
    nbf: number;
    exp: number;
    iat: number
}


const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    let id_token = localStorage.getItem("id_token");
    if (id_token !== null) {
        let decodedToken: tokenInfo = jwt_decode(id_token)
        let isValid = decodedToken.exp > Date.now();
        if (isValid) {
            console.log('Token is still valid')
            return (
                <div data-testid="TokenValidRedirect" >
                    <Route {...rest} />
                </div>
            )
        } else {
            console.log('Token expired')
            return (
                <div data-testid="TokenExpiredRedirect" >
                    <Redirect to={{ pathname: '/login' }}/>

                </div>
            )
        }
    } else {
        console.log('No Token found')
        return (
            <div data-testid="NoToken">
                <Redirect to={{ pathname: '/login' }} />
            </div>
        )
    }
}

export default AuthRoute;
