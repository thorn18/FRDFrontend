import {userActionTypes} from './actions';

export interface UserState {
    token: string,
    loggedIn: boolean,
    error: any
}

//initial states
export const initialUserState: UserState = {
    token: '',
    loggedIn: false,
    error: undefined
}

//reducers
const userReducer = (state: UserState = initialUserState, action: any) => {
    switch(action.type) {
        case userActionTypes.loginSuccess:
            return {token: action.payload.token, loggedIn: true, error: undefined}
        case userActionTypes.loginError:
            return {token: state.token, error: action.payload, loggedIn: false}
        case userActionTypes.logout:
            return {token: '', loggedIn: false, error: undefined};
        default:
            return state;
    }
}

export default userReducer;