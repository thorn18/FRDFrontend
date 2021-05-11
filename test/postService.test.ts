import axios from 'axios';
import PostService from '../src/services/postService';
import { postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as posts from './fivePosts.json'
import { newPost } from './testData'
import { NewPost } from '../src/models/post';

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

  test('should catch a thrown error', async () => {
    const error = {
      "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "One or more validation errors occurred.",
      "status": 400,
      "traceId": "00-dc31d7e70dab4d4483960ec274708559-fdbbaef2da491748-00",
      "errors": { "id": ["oh no!"] }
    }

    const expectedActions = [
      { type: postActionTypes.gettingPosts },
      { type: postActionTypes.gotPostsFailed, payload: error }
    ]
    const store = mockStore({ posts: [] })

    axios.get.mockRejectedValue(error);

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

  test('that an error will be caught when thrown', () => {
    const error = {
      "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "One or more validation errors occurred.",
      "status": 400,
      "traceId": "00-dc31d7e70dab4d4483960ec274708559-fdbbaef2da491748-00",
      "errors": { "id": ["oh no!"] }
    }

    const expectedActions = [
      { type: postActionTypes.creatingPost },
      { type: postActionTypes.createPostFailed, payload: error }
    ]

    const store = mockStore({ posts: [] })
    const newPost: NewPost = {
      username: 'username', 
      description: 'description', 
      image: new File([''], '')
    }

    axios.post.mockRejectedValue(error);
    
    return store.dispatch(PostService.createPost(newPost)).then(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});