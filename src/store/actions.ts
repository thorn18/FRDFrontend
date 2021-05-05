import Post from '../models/post';
import Replies from '../models/replies';

export interface PostAction {
    type: postActionTypes,
    payload?: String | Post[] | Replies
}

export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED",
    gettingReplies = "GETTING_REPLIES",
    gotRepliesSuccess = "GOT_REPLIES_SUCCESS",
    gotRepliesFailed = "GOT_REPLIES_FAILED"
}

export enum userActionTypes {
    login = "LOGIN_USER",
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
<<<<<<< HEAD
}
=======
}
export const loginSuccess = (token: string) => {
    return {
        type: userActionTypes.loginSuccess,
        payload: token
    }
}

export const loginError = (error: String) => {
    return {
        type: userActionTypes.loginError,
        payload: error
    }
}


>>>>>>> c342a0ebb435e39c96e91dad2dea890db85dca0d
