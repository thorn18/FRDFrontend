import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PostList = (/*props:PostProps*/) => {

    let post_state:Post[] = useSelector((state:PostState) => state.postReducer.posts);


    /**
     * This function will populate the post list component for the page.
     */
    function PopulatePostList() {
        
    };

    return (
        <>
            <ol className = "postlist" data-testid = "postlist" id = "postlistmain">
                
            </ol>
            <script type = 'text/javascript'>
                PopulatePostList();
            </script>
        </>
    )
}
export default PostList;



