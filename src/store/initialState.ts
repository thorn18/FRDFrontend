import { AppState, initialPostsState } from './postReducer';
import { initialUserState } from './userReducer';

const initialState: AppState = {
    postsState: initialPostsState,
    userState: initialUserState
}