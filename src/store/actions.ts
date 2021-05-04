import Post from '../models/post';

export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED"
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


