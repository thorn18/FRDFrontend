export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED"
}

export const gettingPosts = () => {
    return {
        type: postActionTypes.gettingPosts
    }
}

//TODO: import Post class if and when it exists
export const gotPostsSuccess = (posts: any) => {
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

