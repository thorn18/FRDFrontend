import Post, { NewPost } from '../models/post';
import User from '../models/user';
import Replies from '../models/replies';

export interface PostAction {
    type: postActionTypes,
    payload?: String | Post[] | Post | Replies | number
}

export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED",
    gettingReplies = "GETTING_REPLIES",
    gotRepliesSuccess = "GOT_REPLIES_SUCCESS",
    gotRepliesFailed = "GOT_REPLIES_FAILED",
    creatingPost = "CREATING_POST",
    createPostSuccess = "CREATE_POST_SUCCESS",
    createPostFailed = "CREATE_POST_FAILED"
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
export const loginSuccess = (username: string, token: string) => {

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

export const loginSuccess = (token: string) => {
    return {
        type: userActionTypes.loginSuccess,
        payload: token, username
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
