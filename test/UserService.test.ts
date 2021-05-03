import axios from 'axios';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postActionTypes } from '../src/store/actions';

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('If user authentication passes()', () => {

    test('should return a token', async () => {
      const expectedActions = [
        { type: postActionTypes.gettingPosts },
        { type: postActionTypes.gotPostsSuccess, payload: posts }
      ]
      const store = mockStore({ posts: [] })
  
      axios.get.mockResolvedValue({
        data: posts,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });
  
      return store.dispatch(PostService.getAllPosts()).then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });