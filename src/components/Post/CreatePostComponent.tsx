import React, { SyntheticEvent, useState, useEffect } from 'react';
import pixelgramlogo from '../../pixelgram-logo.png'
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';

function CreatePostComponent(): JSX.Element{
    
    return (
        <div className='createPostForm' data-testid='createPostForm'>
            <div className='createPostHeader'>
                <img src={pixelgramlogo} id="pixelImage" alt="pixelgram logo"></img>
                <hr className='verticalLine'></hr>
                Create Post
            </div>
            
            <form>
                {/* this will inherit from the formInput class in login component */}
                <div className='formInput'>
                    file name
                    post name
                </div>
                <div className='actionButtonContainer'>
                    <button>Cancel</button>
                    <button></button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostComponent;