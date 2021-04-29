import { postActionTypes } from './actions';
import Post from '../models/post';

//interfaces to give states types
export interface PostsState {
    posts: Post[],
    loading: boolean
}

export interface AppState {
    postsState: PostsState
}

//initial states
export const initialPostsState: PostsState = {
    posts: [],
    loading: false
}

//reducers
const postsReducer = (state: PostsState = initialPostsState, action: any) => {
    switch(action.type) {
        case postActionTypes.gettingPosts:
            return {posts: state.posts, loading: true};
        case postActionTypes.gotPostsSuccess:
            return {posts: [...state.posts, ...action.payload.items], loading: false};
        case postActionTypes.gotPostsFailed:
            return {posts: state.posts, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default postsReducer;