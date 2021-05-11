import React, {SyntheticEvent, useState} from 'react';
import logo from '../../images/CreatePostLogo.png';
import './CreatePost.css';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store/postReducer';
import { useHistory } from 'react-router-dom';

function CreatePost(): JSX.Element {
    let history = useHistory();
    const handleInput = (e: SyntheticEvent) => {

    }

    const handleCancel = () =>{
        history.push('/home');
    }

    return (
        <div id="createPost" data-testid="createPostForm">
            <img src={logo} className="createLogo" alt="Create Post Logo"></img>
            <form>
                    <label htmlFor="file-upload" className="chooseImage-button">
                        Choose Image
                    </label>
                    <input type="file" data-testid="chooseImageButton" />
                    <textarea data-testid='postDescriptionInput' rows={10} cols={80} placeholder="Description..."/>
                
                    <div className='actionButtonContainer'>
                        <button className="buttonCancel" data-testid='cancelButton' onClick={handleCancel}>Cancel</button>
                        <button className="buttonCreatePost" data-testid='createPostButton' >Create Post</button>
                    </div>
            </form>
        </div>
    )
}

export default CreatePost;
