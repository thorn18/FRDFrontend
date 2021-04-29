import React from 'react';
import Post from '../../models/post';
import User from '../../models/user';
import './postComponent.css';

interface postProp {
    post: Post
}

/**
 * This component displays the individual post content
 * @param: post - the post consist of the user, post image and description, and replies
 */
function PostComponent(props: postProp) {

    const { post } = props;

    return (
        <div className="postCard">
            <div className="postHeader">
                {post.user.profileImage ? <img className="pfp" src={post.user.profileImage} />
                    : <img className="pfp" src={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />}
                <span className="headerText">{post.user.username}</span>
            </div>
            <img className="postImage" src={post.post.imageId} />
            <div className="postStats">
                <p className="postLikes">{post.post.likes} likes</p>
                {/* <p className="numRepliess"></p> */}
            </div>
            <div className="descriptionCard">
                <p className="descriptionUser">{post.post.username} <span className="postDesc">{post.post.description}</span></p>
                {/* <span className="descriptionUser">{post.post.username}</span>
                <span className="postDesc">{post.post.description}</span> */}
            </div>
            {/* TO DO: will have to map replies some way */}
            {/* <p className="postResplies">{post.replies}</p> */}
        </div>
    );
}

export default PostComponent;