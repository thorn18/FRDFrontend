import { initialPostsState, PostsState } from './postReducer';
import { initialUserState, UserState } from './userReducer';

export interface AppState {
    postsState: PostsState,
    userState: UserState
}

const initialState: AppState = {
    postsState: initialPostsState,
    userState: initialUserState
}