import React from 'react';
import Reply from '../../models/reply';
import './Reply.css';

interface replyProp {
    reply: Reply
}

export default function ReplyComponent(props: replyProp) {
    return (
        <div className="reply">
            <p className="replier" data-testid="commenter">{props.reply.username}</p>
            <p className="commentcontent" data-testid="comment-content">{props.reply.content}</p>
        </div>
    )
}