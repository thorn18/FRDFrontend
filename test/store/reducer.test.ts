import { postActionTypes } from '../../src/store/actions';
import postsReducer, { PostsState } from '../../src/store/reducer';
import Post from '../../src/models/post';

describe('tests of posts reducer', () => {

    test('That entering an empty action returns initial state', () => {
        const initialPosts: Post[] = [];
        const testInitialState = {posts: initialPosts, loading: false};
        expect(postsReducer(undefined, {})).toEqual(testInitialState);
    });

    test('That gettingPosts action adds loading: true to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = {posts: initialPosts, loading: false};
        expect(postsReducer(testInitialState, {type: postActionTypes.gettingPosts}))
        .toEqual({posts: [], loading: true});
    });

    test('That gotPostsSuccess action adds posts and sets loading: false to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = {posts: initialPosts, loading: true};
        const newPosts: Post[] =
            [{post: {id: '3',
            username: 'user3',
            description: 'post 3',
            timestamp: new Date(),
            likes: 4,
            imageId: 'img3'}}, 
            {post: {id: '4',
            username: 'user4',
            description: 'post 4',
            timestamp: new Date(),
            likes: 8,
            imageId: 'img4'}}];
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsSuccess, payload: newPosts}))
        .toEqual({posts: newPosts, loading: false});
    });

    test('That gotPostsSuccess action doesn\'t override posts and sets loading: false to the state', () => {
        const oldPosts: Post[] = 
            [{post: {id: '1',
            username: 'user1',
            description: 'post 1',
            timestamp: new Date(),
            likes: 3,
            imageId: 'img1'}}, 
            {post: {id: '2',
            username: 'user2',
            description: 'post 2',
            timestamp: new Date(),
            likes: 5,
            imageId: 'img2'}}];
        const testInitialState: PostsState = {posts: oldPosts, loading: true};
        const newPosts: Post[] =
        [{post: {id: '3',
            username: 'user3',
            description: 'post 3',
            timestamp: new Date(),
            likes: 4,
            imageId: 'img3'}}, 
            {post: {id: '4',
            username: 'user4',
            description: 'post 4',
            timestamp: new Date(),
            likes: 8,
            imageId: 'img4'}}];
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsSuccess, payload: newPosts}))
        .toEqual({posts: [...oldPosts, ...newPosts], loading: false});
    });

    test('That gotPostsFailed action does not add posts, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = {posts: [], loading: true};
        const error = 'error';
        expect(postsReducer(testInitialState, {type: postActionTypes.gotPostsFailed, payload: error}))
        .toEqual({posts: [], loading: false, error: error});
    });
})