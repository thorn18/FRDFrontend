import axios from 'axios';
import PostService from '../src/services/postService';
import { postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch} from 'redux-thunk'
import * as posts from './fivePosts.json'
import { newPost } from './testData'
import { NewPost } from '../src/models/post';
import { AnyAction } from 'redux';

jest.mock('axios');

const initialState = {};
type State = typeof initialState;
const middlewares = [thunk]
const mockStore = configureMockStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);

afterEach(() => {
  jest.clearAllMocks();
});

describe('getPosts()', () => {

  test('should return all posts', async () => {
    const expectedActions = [
      { type: postActionTypes.gettingPosts },
      { type: postActionTypes.gotPostsSuccess, payload: posts }
    ]
    const store = mockStore({ posts: [] });

    (axios.get as jest.Mock).mockResolvedValue({
      data: posts,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    return store.dispatch(PostService.getAllPosts()).then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
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
    const store = mockStore({ posts: [] });

    (axios.get as jest.Mock).mockRejectedValue(error);

    return store.dispatch(PostService.getAllPosts()).then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
});

describe('Tests for deletePost', () => {

  let store: any;
  let expectedActions: any;
  let testPostId = 'testPostId';
  const token = 'testToken';

  beforeEach(() => {
    jest.clearAllMocks();

    expectedActions = [
      { type: postActionTypes.deletingPost },
      { type: postActionTypes.deletedPostSuccess, payload: testPostId }
    ];
    store = mockStore({ posts: [] });
  });

  test('That calling deletePost makes an axios call', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    await store.dispatch(PostService.deletePost(testPostId, token));
    expect(axios.delete).toHaveBeenCalled();
  });

  test('That calling deletePost makes an axios call with the correct uri', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    await store.dispatch(PostService.deletePost(testPostId, token));
    expect(axios.delete).toHaveBeenCalledWith(`http://35.223.52.208/api/posts/${testPostId}`, {"headers": {"Authorization": "Bearer testToken"}});

  });

  test('That deletePost dispatches deletedPostSuccess when the axios call is successful', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    await store.dispatch(PostService.deletePost(testPostId, token));
    expect(store.getActions()).toEqual(expectedActions);

  });

  test('That deletePost returns false when the axios call is unsuccessful', async () => {
    expectedActions = [
      { type: postActionTypes.deletingPost },
      { type: postActionTypes.deletedPostFailed, payload: 'FORBIDDEN' }
    ];

    (axios.delete as jest.Mock).mockResolvedValue({
      status: 403,
      statusText: 'FORBIDDEN',
      headers: {},
      config: {},
    });

    await store.dispatch(PostService.deletePost(testPostId, token));
    expect(store.getActions()).toEqual(expectedActions);

  });

});

describe('createPost()', () => {

  test('should add a newly created post', () => {
    const token = 'testToken';
    const expectedActions = [
      { type: postActionTypes.creatingPost },
      { type: postActionTypes.createPostSuccess, payload: 201 }
    ]

    const store = mockStore({ posts: [] });

    (axios.post as jest.Mock).mockResolvedValue({
      data: null,
      status: 201,
      statusText: 'OK',
      header: {},
      config: {},
    });

    return store.dispatch(PostService.createPost(newPost, token)).then(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  test('that an error will be caught when thrown', () => {
    const token = 'testToken'
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
    };

    (axios.post as jest.Mock).mockRejectedValue(error);
    
    return store.dispatch(PostService.createPost(newPost, token)).then(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});