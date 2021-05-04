import axios from 'axios';
import { any } from 'prop-types';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { userActionTypes } from '../src/store/actions';
import UserService from '../src/services/UserService';

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('User authentification', () => {

    test('If user authentication passes, it should return a token', async () => {
      const expectedActions = [
        { type: userActionTypes.loginSuccess}
      ]
      const store = mockStore({ token: ''})
  
      axios.post.mockResolvedValue({
        data: 'aToken',
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });
  
      return store.dispatch(UserService.login()).then(() => {
        expect(axios.post).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    test('If user authentication fails, it should return an error message', async () => {
      const expectedActions = [
        { type: userActionTypes.loginError}
      ]
      const store = mockStore({ token: ''})
  
      axios.post.mockResolvedValue({
        data: 'message',
        status: 401,
        statusText: 'Unauthorizedd',
        headers: {},
        config: {},
      });
  
      return store.dispatch(UserService.login()).then(() => {
        expect(axios.post).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

  });