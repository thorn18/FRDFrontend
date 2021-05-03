import {userActionTypes} from './actions';

export interface UserState {
    username: string,
    token: string
}

export interface AppState {
    userState: UserState
}

//initial states
export const initialUserState: UserState = {
    username: '',
    token: ''
}

//reducers
const userReducer = (state: UserState = initialUserState, action: any) => {
    switch(action.type) {
        case userActionTypes.login:
            return {token: state.token}
        case userActionTypes.loginError:
            return {error: action.payload}
        default:
            return state;
    }
}

export default userReducer;