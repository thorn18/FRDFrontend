import axios from 'axios';
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk';
import decode from 'jwt-decode';
import { AnyAction } from 'redux';
import { userActionTypes } from '../src/store/userActions';
import UserService from '../src/services/userService';

jest.mock('axios');
jest.mock('jwt-decode');

const initialState = {};
type State = typeof initialState;
const middlewares = [thunk]
const mockStore = configureMockStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);

const mockUsername = 'username';
const mockPassword = 'password';

describe('User authentication', () => {

    test('If user authentication passes, it should return a token', async () => {
      const expectedActions = [
        { payload: {token: 'aToken'},
          type: userActionTypes.loginSuccess}
      ]
      const store = mockStore({ token: ''});
      (decode as jest.Mock).mockReturnValue('');
      (axios.post as jest.Mock).mockResolvedValue({
        data: {token: 'aToken'},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });
  
      return store.dispatch(UserService.login(mockUsername, mockPassword)).then(() => {
        expect(decode).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    test('If user authentication fails, it should return an error message', async () => {
      const expectedActions = [
        { type: userActionTypes.loginError}
      ]
      const store = mockStore({ token: ''});
  
      (axios.post as jest.Mock).mockResolvedValue({
        data: 'message',
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {},
      });
  
      return store.dispatch(UserService.login(mockUsername, mockPassword)).then(() => {
        expect(axios.post).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

  });