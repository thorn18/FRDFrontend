import React from 'react';
import Post from '../../models/post';
import NewReply from '../../models/reply';
import '../Post/PostComponent.css';

interface CreateReplyProp {
    post: Post
}

export default function CreateReplyComponent(props: CreateReplyProp) {
    const { post } = props;
    return (
        <div className='createReply' data-testid='createReply'>
            <input data-testid='createReplyInput' type='text' defaultValue='Write a comment'></input>
            <button data-testid='createReplyButton'>Submit Comment</button>
        </div>
    )
}