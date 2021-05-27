import { postActionTypes } from './postActions';
import Post from '../models/post';
import Reply from '../models/reply';

export interface PostsState {
    posts: Post[],
    loading: boolean,
    hasMoreItems: boolean,
    deleted: boolean,
    error: Error | undefined,
    processed: boolean
}

export const initialPostsState: PostsState = {
    posts: [],
    loading: false,
    hasMoreItems: true,
    deleted: false,
    error: undefined,
    processed: false
}

const postsReducer = (state: PostsState = initialPostsState, action: any) => {
    switch (action.type) {
        case postActionTypes.gettingPosts:
            return { ...state, loading: true };
        case postActionTypes.gotPostsSuccess:
            return { ...state, posts: [...state.posts, ...action.payload.items], loading: false, hasMoreItems: action.payload.hasNext, error: undefined, processed: false };
        case postActionTypes.gotPostsFailed:
            return { ...state, loading: false, error: action.payload };
        case postActionTypes.gettingReplies:
            return { ...state, loading: true };
        case postActionTypes.gotRepliesSuccess:
            //adds comments to a specific post. must use index because of pass by reference. 
            let postWithNewCommentsIndex = state.posts.findIndex((post) => post.post.id === action.payload.items[0].postId);
            if (state.posts[postWithNewCommentsIndex]) {
                let allComments = [...state.posts[postWithNewCommentsIndex].comments.items, ...action.payload.items];
                state.posts[postWithNewCommentsIndex].comments = { ...action.payload, items: allComments };
            }
            return { ...state, loading: false, error: undefined };
        case postActionTypes.gotRepliesFailed:
            return { ...state, loading: false, error: action.payload };
        case postActionTypes.deletingPost:
            return { ...state, loading: true, deleted: true };
        case postActionTypes.deletedPostSuccess:
            let posts = state.posts.filter((post) => { return post.post.id !== action.payload });
            return { ...state, posts: [...posts], loading: false, error: undefined };
        case postActionTypes.deletedPostFailed:
            return { ...state, loading: false, error: action.payload };
        case postActionTypes.creatingPost:
            return { ...state, loading: true };
        case postActionTypes.createPostSuccess:
            return { ...state, posts: [], loading: false, error: undefined, processed: true };
        case postActionTypes.createPostFailed:
            return { ...state, loading: false, error: action.payload, processed: true };
        case postActionTypes.creatingReply:
            //adds pending comment to a specific post. must use index because of pass by reference.
            let postPendingCommentIndex = state.posts.findIndex((post) => post.post.id === action.payload.postId);
            if (state.posts[postPendingCommentIndex]) {
                let allComments: Reply[] = [...state.posts[postPendingCommentIndex].comments.items, action.payload];
                state.posts[postPendingCommentIndex].comments = {
                    ...state.posts[postPendingCommentIndex].comments,
                    items: allComments,
                    totalCount: state.posts[postPendingCommentIndex].comments.totalCount + 1
                };
            }
            return { ...state, loading: true, error: undefined };
        case postActionTypes.createReplySuccess:
            //adds comments to a specific post. must use index because of pass by reference.
            let postNewCommentIndex = state.posts.findIndex((post) => post.post.id === action.payload.postId);
            if (state.posts[postNewCommentIndex]) {
                let allComments: Reply[] = [...state.posts[postNewCommentIndex].comments.items, action.payload];
                state.posts[postNewCommentIndex].comments = {
                    ...state.posts[postNewCommentIndex].comments,
                    items: allComments
                };
            }
            return { ...state, loading: false, error: undefined };
        case postActionTypes.createReplyFailed:
            let postFailedCommentIndex = state.posts.findIndex((post) => post.post.id === action.payload.localReply.postId);
            if (state.posts[postFailedCommentIndex]) {
                let commentPending = state.posts[postFailedCommentIndex].comments.items.find((value: Reply) => value.id == action.payload.localReply.id)
                if (commentPending) {
                    let commentWithError: Reply = { ...commentPending, error: action.payload.error }
                    let allComments: Reply[] = [...state.posts[postFailedCommentIndex].comments.items.filter((value: Reply)=>value.id!=action.payload.localReply.id), commentWithError];
                    state.posts[postFailedCommentIndex].comments = {
                        ...state.posts[postFailedCommentIndex].comments,
                        items: allComments,
                    };
                }
            }
            return { ...state, loading: false, error:undefined, processed: true };
        case postActionTypes.reset:
            return { ...state, loading: false, deleted: false, error: undefined, processed: false };
        default:
            return state;
    }
}

export default postsReducer;
