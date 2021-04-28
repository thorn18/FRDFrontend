import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostComponent from '../post/post'

let post_state:Post[] = useSelector((state:PostState) => state.postReducer.posts);
let [postStateLocal,setPostStateLocal] = useState(post_state);

const PostList = (props:Post[]) => {

    /**
     * This function will populate the post list component for the page.
     */

    return (
        <div id = 'postListMain' data-testID = 'postListMain'>
            {postStateLocal.map((post:Post) => <Post key={post.id} />)}
        </div>
    )
}
export default PostList;



