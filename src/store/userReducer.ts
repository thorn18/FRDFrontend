import User from "../models/user";
import { userActionTypes } from "./userActions";

export interface UserState {
    user:User,
    username: string,
    loggedIn: boolean,
    error: any,
    state: any
}

//initial states
export const initialUserState: UserState = {
    user: new User(),
    username: '', 
    loggedIn: false,
    error: undefined,
    state:0
}

//reducers
const userReducer = (state: UserState = initialUserState, action: any) => {
    console.log("Top of User Reducer");
    switch(action.type) {
        case userActionTypes.loginSuccess:
            console.log("loginsuccess");
            return {username: action.payload.user.username, loggedIn: true, user:(action.payload.user as User), state:0}
        case userActionTypes.loginError:
            console.log("loginError");
            return {error: action.payload, loggedIn: false}
        case userActionTypes.logout:
            console.log("logout");
            return {username: '', loggedIn: false, state:0};
        default:
            console.log("default");
            return state;
    }
}

export default userReducer;