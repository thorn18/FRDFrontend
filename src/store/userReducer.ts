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
    switch(action.type) {
        case userActionTypes.loginSuccess:
            console.log(action.payload);
            return {username: action.payload.user.username, loggedIn: true, user:(action.payload.user as User), state:0}
        case userActionTypes.loginError:
            return {error: action.payload, loggedIn: false}
        case userActionTypes.logout:
            return {username: '', loggedIn: false, state:0};
        default:
            return state;
    }
}

export default userReducer;