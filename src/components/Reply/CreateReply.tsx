import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../models/post';
import { NewReply } from '../../models/reply';
import replyService from '../../services/replyService';
import { AppState } from '../../store/postReducer';
import '../Post/PostComponent.css';

interface CreateReplyProp {
    post: Post
}

// export interface Input {
//     content: string
// }

export default function CreateReplyComponent(props: CreateReplyProp) {
    const { post } = props;
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    let token: string | null = useSelector((state: AppState) => state.userState.token);
    let username: string = useSelector((state: AppState) => state.userState.username);

    const handleInput = (e: SyntheticEvent) => {
        let newInput = input;
        if (((e.target) as HTMLInputElement).name === 'content') {
            newInput = (e.target as HTMLInputElement).value;
            setInput(newInput);
        }
    }

    const handleSubmit = () => {
        let newReply: NewReply = {
            username: username,
            content: input,
            postId: post.post.id,
        }
        if (token) {
            dispatch(replyService.createReply(newReply, token, true));
            setInput('');
        }
    }

    return (
        <div className='createReply' data-testid='createReply'>
            <input
                data-testid='createReplyInput'
                type='text'
                placeholder='Write a comment'
                value={input}
                name='content'
                onChange={handleInput}
            />
            <button data-testid='createReplyButton' onClick={handleSubmit}>Submit Comment</button>
        </div>
    )
}