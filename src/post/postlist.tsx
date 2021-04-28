import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostComponent from './PostComponent'
import Post from '../models/post'
import initialPostsState from '../store/reducer'
import PostService from './post.service'
import {AppState} from '../store/reducer'

let post_state: Post[] = useSelector((state: AppState) => state.postsState.posts);
let [postStateLocal, setPostStateLocal] = useState(post_state);

const dispatch = useDispatch();
//Service request that will retrieve all the posts from the API and store them in the AppState
const getPosts = () => PostService.getAllPosts();


//Used to rerender the component whenever the postlist changes.
useEffect(() => {
    getPosts();
}, [])

/**
 * This functional component will display a mapped list of all post.
 * @param props The Post array (Not currently In Use)
 * @returns The rendered postlist Component
 */
const PostList = (props: Post[]) => {

    return (
        <div id='postListMain' data-testID='postListMain'   >
            {postStateLocal.map((post: Post) => <PostComponent key={post.post.id} data-testid="post-test" post={post} />)}
        </div>
    )
}
export default PostList;



