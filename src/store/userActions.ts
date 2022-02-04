import User from "../models/user";

export interface UserAction {
    type: userActionTypes;
    payload?: String | Error | Object | User;
}

export enum userActionTypes {
    loginSuccess = "LOGIN_SUCCESS",
    logout = "LOGOUT_USER",
    loginError = "LOGIN_ERROR"
}

export const loginSuccess = (user:User) => {
    return {
        type: userActionTypes.loginSuccess,
        payload: { user }
    };
};

export const loginError = (error: String) => {
    return {
        type: userActionTypes.loginError,
        payload: error
    };
};

export const logoutUser = () => {
    return {
        type: userActionTypes.logout
    };
};
