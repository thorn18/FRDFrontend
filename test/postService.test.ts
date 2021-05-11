import axios from 'axios';
import PostService from '../src/services/postService';
import { postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as posts from './fivePosts.json'
import { post0, newPost } from './testData'

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPosts()', () => {

  test('should return all posts', async () => {
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

describe('createPost()', () => {

  test('should add a newly created post', () => {
    const expectedActions = [
      { type: postActionTypes.creatingPost },
      { type: postActionTypes.createPostSuccess, payload: 201}
    ]

    const store = mockStore({ posts: [] })

    axios.post.mockResolvedValue({
      data: null,
      status: 201,
      statusText: 'OK',
      header: {},
      config: {},
    });

    return store.dispatch(PostService.createPost(newPost)).then(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});