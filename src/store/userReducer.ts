import {userActionTypes} from './actions';

export interface UserState {
    username: string,
    token: string,
    loggedIn: boolean
}

//initial states
export const initialUserState: UserState = {
    username: '', 
    token: '',
    loggedIn: false
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