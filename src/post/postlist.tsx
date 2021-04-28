import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostComponent from '../post/post'

const PostList = (/*props:PostProps*/) => {

    let post_state:Post[] = useSelector((state:PostState) => state.postReducer.posts);
    let [postlist,setpostlist] = useState(post_state);


    /**
     * This function will populate the post list component for the page.
     */
    function PopulateInitialPostList() {
        // postlist.forEach((post) => {
        //     let new_post = document.createElement('Post');
        //     new_post.className = "post_element";
            
        // })
    };

    return (
        <>
            <script type = 'text/javascript'>
                postlist.forEach((post) => {

                })
            </script>
            <ul className = "postlist" data-testid = "postlist" id = "postlistmain">
                
            </ul>
            <script type = 'text/javascript'>
                PopulatePostList();
            </script>
        </>
    )
}
export default PostList;



