import Post from '../models/post';
import Replies from '../models/replies';

export interface PostAction {
    type: postActionTypes,
    payload?: String | Post[] | Post | Replies | number
}

export interface UserAction {
    type: userActionTypes,
    payload?: String | Error | Object
}

export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED",
    gettingReplies = "GETTING_REPLIES",
    gotRepliesSuccess = "GOT_REPLIES_SUCCESS",
    gotRepliesFailed = "GOT_REPLIES_FAILED",
    deletingPost = "DELETE_POST",
    deletedPostSuccess = "DELETED_POST_SUCCESS",
    deletedPostFailed = "DELETED_POST_FAILED",
    creatingPost = "CREATING_POST",
    createPostSuccess = "CREATE_POST_SUCCESS",
    createPostFailed = "CREATE_POST_FAILED",
    reset = "RESET_POST_STATE",
}

export enum userActionTypes {
    loginSuccess = "LOGIN_SUCCESS",
    logout = "LOGOUT_USER",
    loginError = "LOGIN_ERROR"
}

export const gettingPosts = () => {
    return {
        type: postActionTypes.gettingPosts
    }
}

export const gotPostsSuccess = (posts: Post[]) => {
    return {
        type: postActionTypes.gotPostsSuccess,
        payload: posts
    }
}

export const gotPostsFailed = (error: String) => {
    return {
        type: postActionTypes.gotPostsFailed,
        payload: error
    }
}

export const gettingReplies = () => {
    return {
        type: postActionTypes.gettingReplies
    }
}

export const gotRepliesSuccess = (replies: Replies) => {
    return {
        type: postActionTypes.gotRepliesSuccess,
        payload: replies
    }
}

export const gotRepliesFailed = (error: String) => {
    return {
        type: postActionTypes.gotRepliesFailed,
        payload: error
    }
}

export const deletingPost = () => {
    return {
        type: postActionTypes.deletingPost
    }
}

export const deletedPostSuccess = (postId: string) => {
    return {
        type: postActionTypes.deletedPostSuccess,
        payload: postId
    }
}

export const deletedPostFailed = (error: string) => {
    return {
        type: postActionTypes.deletedPostFailed,
        payload: error
    }
}
        
export const creatingPost = () => {
    return {
        type: postActionTypes.creatingPost
    }
}

export const createPostSuccess = (status: number) => {
    return {
        type: postActionTypes.createPostSuccess,
        payload: status
    }
}

export const createPostFailed = (error: String) => {
    return {
        type: postActionTypes.createPostFailed,
        payload: error
    }
}

export const loginSuccess = (username: string, token: string) => {
    return {
        type: userActionTypes.loginSuccess,
        payload: {token, username}
    }
}

export const loginError = (error: String) => {
    return {
        type: userActionTypes.loginError,
        payload: error
    }
}

export const logoutUser = () => {
    return {
        type: userActionTypes.logout
    }
}

export const resetPostState = () => {
    return {
        type: postActionTypes.reset
    }
}
