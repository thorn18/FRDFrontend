import { postActionTypes } from './actions';
import Post from '../models/post';
import { UserState } from './userReducer';

//interfaces to give states types
export interface PostsState {
    posts: Post[],
    loading: boolean,
    hasMoreItems: boolean,
    deleted: boolean,
    error: any,
    processed: boolean
}

export interface AppState {
    postsState: PostsState,
    userState: UserState
}

//initial states
export const initialPostsState: PostsState = {
    posts: [],
    loading: false,
    hasMoreItems: true,
    deleted: false,
    error: undefined,
    processed: false
}

//reducers
const postsReducer = (state: PostsState = initialPostsState, action: any) => {
    switch (action.type) {
        case postActionTypes.gettingPosts:
            return { ...state, loading: true };
        case postActionTypes.gotPostsSuccess:
            return { ...state, posts: [...state.posts, ...action.payload.items], loading: false, hasMoreItems: action.payload.hasNext, error: undefined };
        case postActionTypes.gotPostsFailed:
            return {  ...state, loading: false, error: action.payload };
        case postActionTypes.gettingReplies:
            return {  ...state, loading: true };
        case postActionTypes.gotRepliesSuccess:
            //adds comments to a specific post. must use index because of pass by reference. 
            let postWithNewCommentsIndex = state.posts.findIndex((post) => post.post.id === action.payload.items[0].postId);
            if (state.posts[postWithNewCommentsIndex]) {
                let allComments = [...state.posts[postWithNewCommentsIndex].comments.items, ...action.payload.items];
                state.posts[postWithNewCommentsIndex].comments = { ...action.payload, items: allComments };
            }
            return {  ...state, loading: false, error: undefined };
        case postActionTypes.gotRepliesFailed:
            return {  ...state, loading: false, error: action.payload };
        case postActionTypes.deletingPost:
            return {  ...state, loading: true, deleted: true };
        case postActionTypes.deletedPostSuccess:
            let posts = state.posts.filter((post) => { return post.post.id !== action.payload });
            return { ...state, posts: [...posts], loading: false, error: undefined };
        case postActionTypes.deletedPostFailed:
            return { ...state, loading: false, error: action.payload };
        case postActionTypes.creatingPost:
            return { ...state, loading: true };
        case postActionTypes.createPostSuccess:
            return { ...state, loading: false, error: undefined, processed: true };
        case postActionTypes.createPostFailed:
            return { ...state, loading: false, error: action.payload, processed: true };
        case postActionTypes.reset:
            return { ...state, loading: false, deleted: false, error: undefined, processed: false };
        default:
            return state;
    }
}

export default postsReducer;
