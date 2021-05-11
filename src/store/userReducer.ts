import {userActionTypes} from './actions';

export interface UserState {
    username: string,
    token: string,
    loggedIn: boolean,
    error: any
}

//initial states
export const initialUserState: UserState = {
    username: '', 
    token: '',
    loggedIn: false,
    error: undefined
}

//reducers
const userReducer = (state: UserState = initialUserState, action: any) => {
    switch(action.type) {
        case userActionTypes.loginSuccess:
            return {username: action.payload.username, token: action.payload.token, loggedIn: true}
        case userActionTypes.loginError:
            return {token: state.token, error: action.payload, loggedIn: false}
        case userActionTypes.logout:
            return {username: '', token: '', loggedIn: false};
        default:
            return state;
    }
}

export default userReducer;