
export enum postActionTypes {
    gettingPosts = "GETTING_POSTS",
    gotPostsSuccess = "GOT_POSTS_SUCCESS",
    gotPostsFailed = "GOT_POSTS_FAILED"
}

export const gettingPosts = () => {
    return {
        type: gettingPosts
    }
}

//TODO: import Post class if and when it exists
export const gotPostsSuccess = (posts: any) => {
    return {
        type: gotPostsSuccess,
        payload: posts
    }
}

export const gotPostsFailed = (error: String) => {
    return {
        type: gotPostsSuccess,
        payload: error
    }
}

