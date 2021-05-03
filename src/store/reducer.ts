import { postActionTypes } from './actions';
import Post from '../models/post';

//interfaces to give states types
export interface PostsState {
    posts: Post[],
    loading: boolean,
    hasMoreItems: boolean
}

export interface AppState {
    postsState: PostsState
}

//initial states
export const initialPostsState: PostsState = {
    posts: [],
    loading: false,
    hasMoreItems: true
}

//reducers
const postsReducer = (state: PostsState = initialPostsState, action: any) => {
    switch(action.type) {
        case postActionTypes.gettingPosts:
            return {posts: state.posts, loading: true, hasMoreItems: state.hasMoreItems};
        case postActionTypes.gotPostsSuccess:
            return {posts: [...state.posts, ...action.payload.items], loading: false, hasMoreItems: action.payload.hasNext};
        case postActionTypes.gotPostsFailed:
            return {posts: state.posts, loading: false, hasMoreItems: state.hasMoreItems, error: action.payload};
        default:
            return state;
    }
}

export default postsReducer;