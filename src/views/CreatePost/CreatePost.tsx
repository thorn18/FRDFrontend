import React, {SyntheticEvent, useState} from 'react';
import logo from '../../images/CreatePostLogo.png';
import './CreatePost.css';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store/postReducer';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from "react-hook-form";
import PostService from '../../services/postService';

export interface PostInput {
    image: any;
    description: any;
}

type FormValues = {
    image: any;
    description: string;
}

function CreatePost(): JSX.Element {
    const [input, setInput] = useState<PostInput>({image: '', description: ''});
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

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const onSubmit = () => {
        //PostService.createPost(input.image, input.description);
        const formData = new FormData();
    }

    const handleCancel = () =>{
        history.push('/home');
    }

    return (
        <div id="createPost" data-testid="createPostForm">
            <img src={logo} className="createLogo" alt="Create Post Logo"></img>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="file-upload" className="chooseImage-button">
                        Choose Image
                    </label>
                    <input type="file" data-testid="chooseImageButton" name="file" onChange={changeHandler} />
                    <textarea data-testid='postDescriptionInput' rows={10} cols={80} name="description" value={input.description} onChange={handleInput} placeholder="Description..."/>
                
                    <div className='actionButtonContainer'>
                        <button className="buttonCancel" data-testid='cancelButton' onClick={handleCancel}>Cancel</button>
                        <button className="buttonCreatePost" data-testid='createPostButton' >Create Post</button>
                    </div>
            </form>
        </div>
    )
}

export default CreatePost;
