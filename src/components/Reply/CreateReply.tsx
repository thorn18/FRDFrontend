import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../models/post';
import { NewReply } from '../../models/reply';
import replyService from '../../services/replyService';
import { AppState } from '../../store/postReducer';
import '../Post/PostComponent.css';
import './CreateReply.css';

interface CreateReplyProp {
    post: Post
}

function CreateReplyComponent(props: CreateReplyProp) {
    const { post } = props;
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(false);

    const dispatch = useDispatch();
    let token: string | null = useSelector((state: AppState) => state.userState.token);
    let username: string = useSelector((state: AppState) => state.userState.username);

    const handleInput = (e: SyntheticEvent) => {
        let newInput = input;
        if (((e.target) as HTMLInputElement).name === 'content') {
            if((e.target as HTMLInputElement).value.trim() === ''){
                setError(true);
            } else {
                setError(false);
            }

            if((e.target as HTMLInputElement).value.trim().length > 120){
                setLimit(true);
            } else {
                setLimit(false);
            }

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
        if(input === ''){
            setError(true)
        }else if (token && error === false && limit === false) {
            dispatch(replyService.createReply(newReply, token, true));
            setInput('');
        }
    }

    return (
        <>
            <div className='createReply' data-testid='createReply'>
                <input
                    data-testid='createReplyInput'
                    className='createReplyInput'
                    type='text'
                    placeholder='Add a comment...'
                    value={input}
                    name='content'
                    onChange={handleInput}
                />
                <button data-testid='createReplyButton' className='createReplyButton' onClick={handleSubmit}>↑</button>
            </div>
            {error && <p style={{color: 'red', textAlign: 'left', marginLeft: 24}}>* Comment is required</p>}
            {limit && <p style={{color: 'red', textAlign: 'left', marginLeft: 24}}>* Character limit is 120</p>}
        </>
    )
}

export default CreateReplyComponent;