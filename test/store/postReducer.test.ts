import { postActionTypes } from '../../src/store/actions';
import postsReducer, { PostsState } from '../../src/store/postReducer';
import Post from '../../src/models/post';
import { post1, post2, post3, post4 } from '../testData';
import { reply0, reply1, reply2, reply3, reply4, reply5, reply6, reply7, replyList0, replyList1 } from '../testReplyData';

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
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: true } }))
            .toEqual({ posts: newPosts, loading: false, hasMoreItems: true });
    });

    test('That gotPostsSuccess action doesn\'t override posts and sets loading: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: true } }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: true });
    });

    test('That gotPostsSuccess action can set hasMoreItems: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: false } }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: false });
    });

    test('That gotPostsFailed action does not add posts, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = { posts: [], loading: true, hasMoreItems: true };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsFailed, payload: error }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, error: error });
    });

    test('That gettingReplies action adds loading: true to the state', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true };
        expect(postsReducer(testInitialState, { type: postActionTypes.gettingReplies }))
            .toEqual({ posts: [post1, post2], loading: true, hasMoreItems: true });
    });

    test('That gotRepliesSuccess action adds comments to A post and sets loading: false to the state', () => {
        post1.comments = replyList0;
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true };
        
        const newReplies = replyList1;
        let updatedPost1 = post1;
        updatedPost1.comments = {
            pageSize: 5,
            items: [
                reply0,
                reply1,
                reply7,
                reply6,
                reply5,
                reply4,
                reply3,
                reply2
            ],
            offset: 5,
            hasNext: false,
            totalCount: 8
        }
        const newPosts = [updatedPost1, post2];

        expect(postsReducer(testInitialState, { type: postActionTypes.gotRepliesSuccess, payload: newReplies }))
            .toEqual({ posts: newPosts, loading: false, hasMoreItems: true });
    });

    test('That gotRepliesFailed action does not add replies, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = { posts: [post1, post2], loading: true, hasMoreItems: true };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.gotRepliesFailed, payload: error }))
            .toEqual({ posts: [post1, post2], loading: false, hasMoreItems: true, error: error });
    });
})