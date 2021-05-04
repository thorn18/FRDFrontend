import {userActionTypes} from './actions';

export interface UserState {
    username: string,
    token: string,
    loggedIn: boolean
}

export interface AppState {
    userState: UserState
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
        case userActionTypes.login:
            return {token: state.token}
        case userActionTypes.loginSuccess:
            return {loggedIn: state.loggedIn} 
        case userActionTypes.loginError:
            return {error: action.payload}
        default:
            return state;
    }
}

export default userReducer;