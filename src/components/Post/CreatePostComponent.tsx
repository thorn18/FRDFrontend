import React, { SyntheticEvent, useState, useEffect } from 'react';
import CreatePostIcon from '../../images/CreatePostIcon.png';
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import './CreatePostComponent.css'

function CreatePostComponent(): JSX.Element{
    
    return (
        <div className='createPostForm' data-testid='createPostForm'>
            <img src={CreatePostIcon} id="pixelImage" alt="pixelgram logo"></img>
            <form >
                {/* this will inherit from the formInput class in login component */}
                <div className='formInput'>
                    <input data-testid='chooseImageButton' type='file' placeholder='Choose Image' className='lightBlueButton'></input>
                    <input data-testid='postDescriptionInput' type='text' placeholder='Description...'></input>
                </div>
                <div className='actionButtonContainer'>
                    <button className='darkBlueButton' data-testid='cancelButton'>Cancel</button>
                    <button className='lightBluebutton' data-testid='createPostButton'>Create Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostComponent;