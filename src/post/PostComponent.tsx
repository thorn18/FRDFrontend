import React from 'react';
import Post from '../models/post';
import User from '../models/user';
import './postComponent.css';

interface postProp {
    post: Post
}

function PostComponent(props: postProp){

    const { post } = props;

    return(
        <div className="postCard">
            <div className="postHeader">
                {/* <p className="headerText">username</p> */}
            </div>
            <img className="postImage" src={post.post.imageId}/>
            <div className="postStats">
                <p className="postLikes">{post.post.likes} likes</p>
                {/* <p className="numComments"></p> */}
            </div>
            <p className="postDesc">{post.post.description}</p>
            {/* TO DO: will have to map comments some way */}
            {/* <p className="postComments">{post.comments}</p> */}
        </div>
    );
}

export default PostComponent;