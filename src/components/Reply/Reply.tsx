import React from 'react';
import Reply, { NewReply } from '../../models/reply';
import Post from '../../models/post'
import '../Post/PostComponent.css';
import { BsArrowRepeat } from 'react-icons/bs'
import ReactTooltip from 'react-tooltip';
import './Reply.css'
import { useDispatch, useSelector } from 'react-redux';
import replyService from '../../services/replyService';
import { AppState } from '../../store/initialState';

interface replyProp {
    reply: Reply
}

export default function ReplyComponent(props: replyProp): JSX.Element {

    const dispatch = useDispatch();
    const loggedIn: boolean = useSelector((state: AppState) => state.userState.loggedIn);
    const token: string | null = useSelector((state: AppState) => state.userState.token);
    const currentReplyError = useSelector((state: AppState) => state.postsState.posts.find((value: Post)=>value.post.id===props.reply.postId))?.comments.items.find((value: Reply)=>value.id===props.reply.id)?.error
    const currentReplyLocal = useSelector((state: AppState) => state.postsState.posts.find((value: Post)=>value.post.id===props.reply.postId))?.comments.items.find((value: Reply)=>value.id===props.reply.id)?.local

    function handleClick() {
        let localNewReply: NewReply = {
            username: props.reply.username,
            postId: props.reply.postId,
            content: props.reply.content
        }
        if (loggedIn && token) {
            dispatch(replyService.createReply(localNewReply, token, false, props.reply));
        }

    }

    return (
        <div className="descriptionCard">
            <p className="descriptionUser" data-testid="commenter">{`${props.reply.username} `}
                <span style={currentReplyLocal ? { color: "lightgray" } : { color: 'inherit'}} className="postDesc" data-testid="comment-content">{props.reply.content}</span>
                {currentReplyError &&
                    <>
                        <BsArrowRepeat data-tip='Resend Comment' className='resendComment' onClick={handleClick} />
                        <ReactTooltip place='top' effect='solid'>Resend Comment</ReactTooltip>
                    </>
                }
            </p>
        </div>
    )
}
