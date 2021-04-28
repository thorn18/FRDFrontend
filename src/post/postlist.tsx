import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostComponent from './PostComponent'
import Post from '../models/post'
import initialPostsState from '../store/reducer'
import PostService from './post.service'

let post_state: Post[] = useSelector((state: initialPostsState) => state.postsReducer.posts);
let [postStateLocal, setPostStateLocal] = useState(post_state);

const dispatch = useDispatch();
const getPosts = () => PostService.getAllPosts();

useEffect(() => {
    getPosts();
}, [])

const PostList = (props: Post[]) => {

    /**
     * This function will populate the post list component for the page.
     */

    return (
        <div id='postListMain' data-testID='postListMain'   >
            {postStateLocal.map((post: Post) => <PostComponent key={post.post.id} data-testid = "post-test" post={post} />)}
        </div>
    )
}
export default PostList;



