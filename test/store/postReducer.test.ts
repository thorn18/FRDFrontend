import { postActionTypes } from '../../src/store/actions';
import postsReducer, { PostsState } from '../../src/store/postReducer';
import Post from '../../src/models/post';
import { post1, post2, post3, post4 } from '../testData';
import { reply0, reply1, reply2, reply3, reply4, reply5, reply6, reply7, replyList0, replyList1 } from '../testReplyData';
import Reply from '../../src/models/reply';
import Replies from '../../src/models/replies';


describe('tests of posts reducer', () => {

    test('That entering an empty action returns initial state', () => {
        const initialPosts: Post[] = [];
        const testInitialState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(undefined, {})).toEqual(testInitialState);
    });

    test('That gettingPosts action adds loading: true to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.gettingPosts }))
            .toEqual({ posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That gotPostsSuccess action adds posts and sets loading: false to the state', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const newPosts: Post[] = [post1, post2];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: true } }))
            .toEqual({ posts: newPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That gotPostsSuccess action doesn\'t override posts and sets loading: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: true } }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That gotPostsSuccess action can set hasMoreItems: false to the state', () => {
        const oldPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: oldPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const newPosts: Post[] = [post3, post4];
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsSuccess, payload: { items: newPosts, hasNext: false } }))
            .toEqual({ posts: [...oldPosts, ...newPosts], loading: false, hasMoreItems: false, deleted: false, error: undefined, processed: false });
    });

    test('That gotPostsFailed action does not add posts, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = { posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.gotPostsFailed, payload: error }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, error: error, deleted: false, processed: false });
    });

    test('That gettingReplies action adds loading: true to the state', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.gettingReplies }))
            .toEqual({ posts: [post1, post2], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That gotRepliesSuccess action adds comments to A post and sets loading: false to the state', () => {
        post1.comments = replyList0;
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        
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
            .toEqual({ posts: newPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That gotRepliesFailed action does not add replies, adds an error, sets loading: false to the state', () => {
        const testInitialState: PostsState = { posts: [post1, post2], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.gotRepliesFailed, payload: error }))
            .toEqual({ posts: [post1, post2], loading: false, hasMoreItems: true, error: error, deleted: false, processed: false });
    });
});

describe('testing the reducer for the deletePost service', () => {

    test('The deleting action', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.deletingPost }))
            .toEqual({ posts: [post1, post2], loading: true, hasMoreItems: true, deleted: true, error: undefined, processed: false });
    });

    test('The deletePostSuccess', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: true, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.deletedPostSuccess, payload: post1.post.id }))
            .toEqual({ posts: [ post2 ], loading: false, hasMoreItems: true, deleted: true, error: undefined, processed: false });
    });

    test('The deletePostFailed', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: true, error: undefined, processed: false };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.deletedPostFailed, payload: error }))
            .toEqual({ posts: initialPosts, loading: false, hasMoreItems: true, error: error, deleted: true, processed: false });
    });
});

describe('testing the reducer for the createPost service', () => {

    test('The creatingPost action', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.creatingPost }))
            .toEqual({ posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('The createPostSuccess', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.createPostSuccess, payload: { status: 201 } }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: true });
    });

    test('The createPostFailed', () => {
        const testInitialState: PostsState = { posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.createPostFailed, payload: error }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, error: error, deleted: false, processed: true });
    });
});

describe('testing the reducer for the createReply service', () => {

    test('The createReply action', () => {
        const initialPosts: Post[] = [];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.creatingReply }))
            .toEqual({ posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });
    
    test('The createReplySuccess', () => {
        const initialPosts: Post[] = [post1, post2];
        let newReply: Reply = {...reply0, postId: post1.post.id };
        let newReplies: Replies = {
            items: [...post1.comments.items, newReply ],
            pageSize: 5,
            totalCount: post1.comments.totalCount + 1,
            offset: post1.comments.offset,
            hasNext: post1.comments.hasNext
        }
        let post1WithNewComment = {...post1, comments: newReplies };
        const newPosts: Post[] = [post1WithNewComment, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.createReplySuccess, payload: newReply}))
            .toEqual({ posts: [ ...newPosts ], loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('The createReplyFailed', () => {
        const testInitialState: PostsState = { posts: [], loading: true, hasMoreItems: true, deleted: false, error: undefined, processed: false };
        const error = 'error';
        expect(postsReducer(testInitialState, { type: postActionTypes.createReplyFailed, payload: error }))
            .toEqual({ posts: [], loading: false, hasMoreItems: true, error: error, deleted: false, processed: true });
    });
});

describe('Tests for resetting postsState', () => {
    test('That we can reset the state after having deleted a post successfully', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: true, error: undefined, processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.reset }))
            .toEqual({ posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That we can reset the state after having deleted a post unsuccessfully', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: true, error: 'oh no!', processed: false };
        expect(postsReducer(testInitialState, { type: postActionTypes.reset }))
            .toEqual({ posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });

    test('That we can reset the state after having created a post successfully', () => {
        const initialPosts: Post[] = [post1, post2];
        const testInitialState: PostsState = { posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: true };
        expect(postsReducer(testInitialState, { type: postActionTypes.reset }))
            .toEqual({ posts: initialPosts, loading: false, hasMoreItems: true, deleted: false, error: undefined, processed: false });
    });
});