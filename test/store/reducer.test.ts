import { postActionTypes } from '../../src/store/actions';
import postsReducer, { PostsState } from '../../src/store/reducer';
import Post from '../../src/models/post';
import { post1, post2, post3, post4 } from '../testData';

describe('tests of posts reducer', () => {

    test('That entering an empty action returns initial state', () => {
        const initialPosts: Post[] = [];
        const testInitialState = { posts: initialPosts, loading: false, hasMoreItems: true };
        expect(postsReducer(undefined, {})).toEqual(testInitialState);
    });

    test('That gettingPosts action adds loading: true to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true };
        expect(postsReducer(testInitialState, { type: postActionTypes.gettingPosts }))
            .toEqual({ posts: [], loading: true, hasMoreItems: true });
    });

    test('That gotPostsSuccess action adds posts and sets loading: false to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true };
        const newPosts: Post[] = [post1, post2];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: {items: newPosts, hasNext: true} }))
            .toEqual({ posts: newPosts, loading: false, hasMoreItems: true });
    });

    test('That gotPostsSuccess action doesn\'t override posts and sets loading: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: {items: newPosts, hasNext: true} }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: true });
    });

    test('That gotPostsSuccess action can set hasMoreItems: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: {items: newPosts, hasNext: false} }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: false });
    });

    test('That gotPostsFailed action does not add posts, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = { posts: [], loading: true, hasMoreItems: true };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsFailed, payload: error }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, error: error });
    });
})