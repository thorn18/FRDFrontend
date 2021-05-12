import React, { SyntheticEvent, useEffect, useState } from 'react';
import logo from '../../images/CreatePostLogo.png';
import './CreatePost.css';
import { useHistory } from 'react-router-dom';
import PostService from '../../services/postService';
import { NewPost } from '../../models/post';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/postReducer';

// export interface PostInput {
//     description: any;
// }

// type FormValues = {
//     image: any;
//     description: string;
// }

function CreatePost(): JSX.Element {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [descriptionInteracted, setDI] = useState(false);
    const [imgInteracted, setII] = useState(false);
    const [createErr, setErr] = useState(false);

    let token: string = useSelector((state: AppState) => state.userState.token);
    let status: boolean = useSelector((state:AppState) => state.postsState.loading);
    let error: any = useSelector((state:AppState) => state.postsState.error);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(status == false && error == undefined){
            setErr(false);
            history.push('/home');
        } else if (status == false && error !== undefined){
            setErr(true);
        }
    })

    const handleInput = (e: SyntheticEvent) => {
        let newInput = input;
        newInput = (e.target as HTMLInputElement).value;
        setInput(newInput);
        setDI(true);
    }

    const imageHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        
    }

    const onSubmit = (event: any) => {
        const newPost: NewPost = { username: '', image: selectedFile, description: input };
        dispatch(PostService.createPost(newPost, token));
    }

    const handleCancel = () => {
        history.push('/home');
    }

    return (
        <div id="createPost" data-testid="createPostForm">
            <img src={logo} className="createLogo" alt="Create Post Logo"></img>
            <form>
                <input type="file" className="chooseImage-button" data-testid="chooseImageButton" name="file" onChange={imageHandler} onClick={() => setII(true)}/>
                {selectedFile == undefined && imgInteracted == true && <p style={{ color: 'red', textAlign: 'left' }} data-testid="imgWarning">* Image is required</p>}
                <textarea data-testid='postDescriptionInput' rows={10} cols={80} name="description" value={input} onChange={handleInput} placeholder="Description..." />
                {input == '' && descriptionInteracted == true && <p style={{ color: 'red', textAlign: 'left' }} data-testid="imgWarning">* Description is required</p>}

                <div className='actionButtonContainer'>
                    <button className="buttonCancel" data-testid='cancelButton' onClick={handleCancel}>Cancel</button>
                    <button
                        type='button'
                        className="buttonCreatePost"
                        data-testid='createPostButton'
                        disabled={selectedFile && input ? false : true}
                        onClick={onSubmit}>
                        Create Post
                    </button>
                    {createErr === true && <p style={{color: 'red', textAlign: 'left'}}>Failed to create post</p>}
                </div>
            </form>
        </div>
    )
}

export default CreatePost;
