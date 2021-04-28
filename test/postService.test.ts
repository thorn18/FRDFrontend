import axios from 'axios';
import PostService from '../src/post/postService';
//import { render, rest, setupServer, fireEvent, waitFor, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/*
-testing to see if the axios.get is actually called
-the rest of the test won't work if the axios doesn't
-make sure the data object is returned from the function
*/

//afterEach(cleanup);

test.only ('getAllPosts returns a promise with some data in it', async () => {
    let dataObj;
    let obj = {data: []};

    axios.get = jest.fn().mockResolvedValue(obj);
    await 

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(dataObj).toBe(obj.data);
    expect(axios.get).toHaveBeenCalledWith("http://35.223.52.208/posts");
});