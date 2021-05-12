import {userActionTypes} from '../../src/store/actions';
import userReducer, {UserState} from '../../src/store/userReducer';

describe('Tests of user reducer', () => {
    test('Should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                username: '', 
                token: '',
                loggedIn: false,
                error: undefined 
            }
        )
    });

    test('That loginSuccess action sets logged in to true and return a token', () => {
        const testInitialUserState: UserState = {token: '', loggedIn: false, error: undefined};
        const token = 'aToken';
        const user = 'aUser';
        expect(userReducer(testInitialUserState, {
            type: userActionTypes.loginSuccess,
            payload: {username: user, token: token, loggedIn: true, error: undefined}
            
        })).toEqual({username: user, token: token, loggedIn: true, error: undefined});
    });
   
    test('That the user failed to login', () => {
        const testInitialUserState: UserState = {token: '', loggedIn: false, error: undefined};
        const error = 'error';
        expect(userReducer(testInitialUserState, {type: userActionTypes.loginError, payload: error})).toEqual({
            loggedIn: false,
            token: '',
            error: error
        });
    });

    test('That the user successfully logs out', () => {
        const token = 'aToken';
        const user = 'aUser';
        const testInitialUserState: UserState = {username: user, token: token, loggedIn: true, error: undefined};
        expect(userReducer(testInitialUserState, {type: userActionTypes.logout, payload: {username: '', token: '', loggedIn: false, error: undefined}})).toEqual({
            username: '',
            token: '',
            loggedIn: false,
            error: undefined
        });
    });
});