import React, { useEffect } from 'react';
import Post from '../../models/post';
import FlatList from 'flatlist-react';
import PostComponent from './PostComponent';
import './PaginationList.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import PostService from '../../services/postService';

const PaginationList = () => {

    let posts: Post[] = useSelector((state: AppState) => state.postsState.posts);
    let loading: boolean = useSelector((state: AppState) => state.postsState.loading);
    let hasMoreItems: boolean = useSelector((state: AppState) => state.postsState.hasMoreItems);

    const dispatch = useDispatch();
    const getPosts = () => {
        if(!loading) {
            dispatch(PostService.getAllPosts(5, posts.length));
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    function showBlank() {
        if (posts.length === 0 && loading) {
            return <div>Loading list...</div>
        }

        return <div>No items for this list</div>
    }

    const divStyle = {
        height: 500
    };
    return (
        <div className='listContainer' id='postContainer'>
            <FlatList
                list={posts}
                renderItem={(item: Post) => <PostComponent key={item.post.id} data-testid="post-test" post={item} />}
                renderWhenEmpty={showBlank}
                hasMoreItems={hasMoreItems}
                loadMoreItems={getPosts}
            />
        </div>
    )
}

export default PaginationList;