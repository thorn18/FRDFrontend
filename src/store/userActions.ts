
export interface UserAction {
    type: userActionTypes;
    payload?: String | Error | Object;
}

export enum userActionTypes {
    loginSuccess = "LOGIN_SUCCESS",
    logout = "LOGOUT_USER",
    loginError = "LOGIN_ERROR"
}

export const loginSuccess = (username: string, token: string) => {
    return {
        type: userActionTypes.loginSuccess,
        payload: { token, username }
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
