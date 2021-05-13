import React, { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../models/post';
import NewReply from '../../models/reply';
import { AppState } from '../../store/postReducer';
import '../Post/PostComponent.css';

interface CreateReplyProp {
    post: Post
}

export interface Input {
    content: string
}

export default function CreateReplyComponent(props: CreateReplyProp) {
    const { post } = props;
    const [input, setInput] = useState<Input>({ content: '' })
    let token: string | null = useSelector((state: AppState) => state.userState.token);

    const handleInput = (e: SyntheticEvent) => {
        let newInput = { ...input }
        if (((e.target) as HTMLInputElement).name === 'content') {
            newInput.content = (e.target as HTMLInputElement).value;
            setInput(newInput);
        }
    }

    return (
        <div className='createReply' data-testid='createReply'>
            <input data-testid='createReplyInput' type='text' defaultValue='Write a comment' name='content' onChange={handleInput}></input>
            <button data-testid='createReplyButton'>Submit Comment</button>
        </div>
    )
}