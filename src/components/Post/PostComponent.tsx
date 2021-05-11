import React from 'react';
import Post from '../../models/post';
import User from '../../models/user';
import './PostComponent.css';
import likes from '../../images/Likes.png';
import ReplyComponent from '../Reply/Reply';
import Reply from '../../models/reply';
import ReplyList from '../Reply/ReplyList';

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
        <div className="postCard" data-testid='post-card'>
            <div className="postHeader">
                {post.user.profileImage ? <img className="pfp" src={post.user.profileImage} />
                    : <img className="pfp" src={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />}
                <span className="headerText">{post.user.username}</span>
            </div>
            <div className="imageDiv">
                <img className="postImage" src={'http://35.223.52.208/api/image/' + post.post.imageId} />
            </div>
            <div className="postStats">
                <img src={likes} className="likesIcon" />
                <div className="postMeta">
                    {post.post.likes} likes &nbsp; {post.comments.totalCount} comments
                </div>
            </div>
            <div className="descriptionCard">
                <p className="descriptionUser">{post.post.username} <span className="postDesc">{post.post.description}</span></p>
                {/* <span className="descriptionUser">{post.post.username}</span>
                <span className="postDesc">{post.post.description}</span> */}
            </div>
            <div className="replyList">
                <ReplyList post={props.post}/>
                {(post.comments.items).map((reply) => {
                    return <ReplyComponent reply={reply} key={reply.id}/>
                })}
            </div>
        </div>
    );
}

export default PostComponent;