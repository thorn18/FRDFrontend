import axios, { AxiosResponse } from 'axios';
import PostService from '../src/services/postService';
import { gettingPosts, gotPostsFailed, gotPostsSuccess, postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as posts from './fivePosts.json'

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPosts()', () => {

  test('should return all posts', async () => {
    const expectedActions = [
      { type: postActionTypes.gettingPosts },
      { type: postActionTypes.gotPostsSuccess, payload: posts.items }
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



