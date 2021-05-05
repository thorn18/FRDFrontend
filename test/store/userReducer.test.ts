import { statement } from '@babel/template';
import {userActionTypes} from '../../src/store/actions';
import userReducer, {UserState} from '../../src/store/userReducer';

jest.mock('jwt-decode', () => jest.fn());

jest.mock('jwt-decode', () => () => ({exp: 500}));

describe('Tests of user reducer', () => {
    test('Should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                token: '',
                loggedIn: false
            }
        )
    });

    test('That loginSuccess action sets logged in to true and return a token', () => {
        const testInitialUserState: UserState = {token: '', loggedIn: false};
        const token = 'aToken';
        expect(userReducer(testInitialUserState, {
            type: userActionTypes.loginSuccess,
            payload: {token: token, loggedIn: true}

        })).toEqual({token: token, loggedIn: true})
    });
   
    test('That the user failed to login', () => {
        const testInitialState: UserState = {token: '', loggedIn: false};
        const error = 'error';
        expect(userReducer(testInitialState, {type: userActionTypes.loginError, payload: error})).toEqual({
            loggedIn: false,
            error: error
        })
    });
})