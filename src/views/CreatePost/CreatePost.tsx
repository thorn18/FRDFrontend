import React, {SyntheticEvent, useState} from 'react';
import logo from '../../images/CreatePostLogo.png';
import './CreatePost.css';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store/postReducer';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from "react-hook-form";
import PostService from '../../services/postService';
import { NewPost } from '../../models/post';

export interface PostInput {
    description: any;
}

type FormValues = {
    image: any;
    description: string;
}

function CreatePost(): JSX.Element {
    const [input, setInput] = useState<PostInput>({description: ''});
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const {register, handleSubmit} = useForm<FormValues>();
    const history = useHistory();

    const handleInput = (e: SyntheticEvent) => {
        let newInput = {...input};

        if((e.target as HTMLInputElement).name === "description") {
            newInput.description = (e.target as HTMLInputElement).value;
            setInput(newInput);
        }
    }

    const imageHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const onSubmit = () => {
        const newPost: NewPost = {username: '', image: selectedFile, description: input.description};
        console.log(newPost);
        //PostService.createPost(newPost);
    }

    const handleCancel = () =>{
        history.push('/home');
    }

    return (
        <div id="createPost" data-testid="createPostForm">
            <img src={logo} className="createLogo" alt="Create Post Logo"></img>
            <form>                
                <input type="file" className="chooseImage-button" data-testid="chooseImageButton" name="file" onChange={imageHandler}/>
                <textarea data-testid='postDescriptionInput' rows={10} cols={80} name="description" value={input.description} placeholder="Description..."/>
            
                <div className='actionButtonContainer'>
                    <button className="buttonCancel" data-testid='cancelButton'  onClick={handleCancel}>Cancel</button>
                    <button className="buttonCreatePost" data-testid='createPostButton' onClick={onSubmit}>Create Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;
