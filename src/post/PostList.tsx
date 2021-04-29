import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostComponent from './PostComponent'
import Post from '../models/post'
import initialPostsState from '../store/reducer'
import PostService from './postService'
import { AppState } from '../store/reducer'
import './postList.css';


const PostList = () => {

    let post_state: Post[] = useSelector((state: AppState) => state.postsState.posts);
    let [postStateLocal, setPostStateLocal] = useState(post_state);

    const dispatch = useDispatch();
    const getPosts = () => dispatch(PostService.getAllPosts());

    useEffect(() => {
        getPosts();
        sortStorePosts();
    }, [])

    function sortStorePosts() {
        let sortedlist = postStateLocal.sort((a, b) => {
            return a.post.timestamp.getTime() - b.post.timestamp.getTime()
        });
        setPostStateLocal(sortedlist);
    }

    return (
        <div id='postListMain' data-testid='postListMain'   >
            {postStateLocal.map((post: Post) => <PostComponent key={post.post.id} data-testid="post-test" post={post} />)}
        </div>
    )
}
export default PostList;



