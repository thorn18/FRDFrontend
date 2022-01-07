import React, { useEffect, useState } from 'react';
import Post from '../../models/post';
import './PostComponent.css';
import likes from '../../images/Likes.png';
import ReplyComponent from '../Reply/Reply';
import Reply from '../../models/reply';
import ReplyList from '../Reply/ReplyList';
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import postService from "../../services/postService";
import { AppState } from '../../store/initialState';
import CreateReplyComponent from '../Reply/CreateReply';

interface postProp {
    post: Post
}

/**
 * This component displays the individual post content
 * @param: post - the post consist of the user, post image and description, and replies
 */
function PostComponent(props: postProp) {

    const { post } = props;
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const user: string = useSelector((state: AppState) => state.userState.username);
    const loggedin: boolean = useSelector((state: AppState) => state.userState.loggedIn);
    const token: string | null = useSelector((state: AppState) => state.userState.token);
    const posts = useSelector((state: AppState) => state.postsState)
    useEffect(() => { }, [posts])

    function deletePost() {
        if (loggedin && token) dispatch(postService.deletePost(post.post.postId, token, false));
    }

    return (
        <div className="postCard" data-testid='post-card'>
            <div className="postHeader">
                {post.user.profileImage ? <img className="pfp" src={post.user.profileImage} alt={`${post.user.username}'s Profile`} />
                    : <img className="pfp" src={'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt={`${post.user.username}'s Profile`} />}
                <span className="headerText">{post.user.username}</span>
                {loggedin && user === post.user.username && <button className="deletePostButtonBox" data-testid="deleteButtonBox" onClick={() => setShowMenu(!showMenu)}><BsThreeDots className="threeDots" />
                    {showMenu && <button id="deletePostButton" data-testid="deleteButton" onClick={deletePost}><label>Delete Post</label></button>}
                </button>}
            </div>
            <div className="imageDiv">
                <img className="postImage" src={'https://group3photonimagebucket.s3.amazonaws.com/' + post.post.imageId} alt='Post Content' />
            </div>
            <div className="postStats">
                <img src={likes} className="likesIcon" alt='Likes' />
                <div className="postMeta">
                    {post.post.likes} likes &nbsp; {post.comments.totalCount} {post.comments.totalCount === 1 ? 'comment' : 'comments'}
                </div>
            </div>
            <div className="descriptionCard">
                <p className="descriptionUser">{post.post.username} <span className="postDesc">{post.post.description}</span></p>
            </div>
            <div className="replyList">
                <ReplyList post={props.post} />
                {(post.comments.items).map((reply: Reply) => {
                    return <ReplyComponent reply={reply} key={reply.replyId} />
                })}
                {loggedin && <CreateReplyComponent post={props.post} />}
            </div>
        </div>
    );
}

export default PostComponent;