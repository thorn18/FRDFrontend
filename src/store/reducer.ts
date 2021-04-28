import { postActionTypes } from './actions';

const initialPostsState = {
    posts: [],
    loading: false
}

const postsReducer = (state: any = initialPostsState, action: any) => {
    switch(action.type) {
        case postActionTypes.gettingPosts:
            return {posts: state.posts, loading: true};
        case postActionTypes.gotPostsSuccess:
            return {posts: [...state.posts, ...action.payload], loading: false};
        case postActionTypes.gotPostsFailed:
            return {posts: state.posts, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default postsReducer;