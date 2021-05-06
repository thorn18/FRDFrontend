import {userActionTypes} from './actions';

export interface UserState {
    token: string,
    loggedIn: boolean
}

//initial states
export const initialUserState: UserState = {
    token: '',
    loggedIn: false
}

//reducers
const userReducer = (state: UserState = initialUserState, action: any) => {
    switch(action.type) {
        case userActionTypes.loginSuccess:
            return {token: action.payload.token, loggedIn: true}
        case userActionTypes.loginError:
            return {error: action.payload, loggedIn: false}
        case userActionTypes.logout:
            return {token: '', loggedIn: false};
        default:
            return state;
    }
}

export default userReducer;