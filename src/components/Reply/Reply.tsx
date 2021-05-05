import React from 'react';
import Reply from '../../models/reply';
import '../Post/PostComponent.css';

interface replyProp {
    reply: Reply
}

export default function ReplyComponent(props: replyProp) {
    return (
        <div className="descriptionCard">
            <p className="descriptionUser" data-testid="commenter">{`${props.reply.username} `}
                <span className="postDesc" data-testid="comment-content">{props.reply.content}</span>
            </p>
        </div>
    )
}