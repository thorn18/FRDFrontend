import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostComponent from './postComponent'
import Post from '../models/post'
import initialPostsState from '../store/reducer'
import PostService from './postService'
import { AppState } from '../store/reducer'
import './postlist.css';
import PaginationList from './paginationList';


const PostList = () => {

    let post_state: Post[] = useSelector((state: AppState) => state.postsState.posts);
    let [postStateLocal, setPostStateLocal] = useState(post_state);

    const dispatch = useDispatch();
    const getPosts = () => PostService.getAllPosts();

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div id='postListMain' data-testid='postListMain'   >
           <PaginationList></PaginationList>
        </div>
    )
}
export default PostList;



