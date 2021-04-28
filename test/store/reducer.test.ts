import { postActionTypes } from '../../src/store/actions';
import postsReducer from '../../src/store/reducer';

describe('tests of posts reducer', () => {

    test('That entering an empty action returns initial state', () => {
        const testInitialState = {posts: [], loading: false};
        expect(postsReducer(undefined, {})).toEqual(testInitialState);
    });

    test('That gettingPosts action adds loading: true to the state', () => {
        const testInitialState = {posts: [], loading: false};
        expect(postsReducer(testInitialState, {type: postActionTypes.gettingPosts}))
        .toEqual({posts: [], loading: true});
    });

    test('That gotPostsSuccess action adds posts and sets loading: false to the state', () => {
        const testInitialState = {posts: [], loading: true};
        //TODO will have to change to actual posts if/when Post class exists
        const newPosts = ['hello', 'world'];
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsSuccess, payload: newPosts}))
        .toEqual({posts: newPosts, loading: false});
    });

    test('That gotPostsSuccess action doesn\'t override posts and sets loading: false to the state', () => {
        const testInitialState = {posts: ['old', 'posts'], loading: true};
        //TODO will have to change to actual posts if/when Post class exists
        const newPosts = ['hello', 'world'];
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsSuccess, payload: newPosts}))
        .toEqual({posts: ['old', 'posts', ...newPosts], loading: false});
    });

    test('That gotPostsFailed action does not add posts, adds an error, sets loading: false to the state', () => {
        const testInitialState = {posts: [], loading: true};
        //TODO will have to change to actual posts if/when Post class exists
        const error = 'error';
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsFailed, payload: error}))
        .toEqual({posts: [], loading: false, error: error});
    });
})