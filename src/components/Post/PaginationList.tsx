import React, { useEffect } from 'react';
import Post from '../../models/post';
import PostComponent from './PostComponent';
import './PaginationList.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/postReducer';
import PostService from '../../services/postService';
import InfiniteScroll from "react-infinite-scroll-component";

const PaginationList = () => {

    let posts: Post[] = useSelector((state: AppState) => state.postsState.posts);
    let loading: boolean = useSelector((state: AppState) => state.postsState.loading);
    let hasMoreItems: boolean = useSelector((state: AppState) => state.postsState.hasMoreItems);

    const dispatch = useDispatch();
    const getPosts = () => {
        if (!loading) {
            dispatch(PostService.getAllPosts(5, posts.length));
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <div className='listContainer' id='postContainer' data-testid='scrollContainer'>
            <InfiniteScroll
                dataLength={posts.length}
                next={getPosts}
                hasMore={hasMoreItems}
                loader={<h4>Loading...</h4>}
                scrollThreshold='100%'
            >
                <div>
                {posts.map((item) => (
                    <PostComponent key={item.post.id} data-testid="post-test" post={item} />
                ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default PaginationList;