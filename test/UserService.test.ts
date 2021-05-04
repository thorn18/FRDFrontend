import axios from 'axios';
import { any } from 'prop-types';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { userActionTypes } from '../src/store/actions';
//import UserService from '../services/UserService';

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('If user authentication passes()', () => {

    test('should return a token', async () => {
      const expectedActions = [
        { type: userActionTypes.login}
      ]
      const store = mockStore({ token: ''})
  
      axios.get.mockResolvedValue({
        data: any,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });
  
      return store.dispatch(UserService.login()).then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });