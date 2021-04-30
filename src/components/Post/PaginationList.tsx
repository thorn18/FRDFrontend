import React, { useEffect, useState } from 'react';
import Post from '../../models/post';
import FlatList from 'flatlist-react';
import PostComponent from './PostComponent';
import fetch from 'node-fetch';

interface listState {
    hasMoreItems: boolean,
    offset: number,
    postsData: any[];
    loading: boolean
}

const PaginationList = () => {
    const [state, setState] = useState<listState>(
        {
            hasMoreItems: false,
            offset: 0,
            postsData: [],
            loading: true
        });

    useEffect(() => {
        fetchData();

    }, []);



    function showBlank() {
        if (state.postsData.length === 0 && state.loading) {
            return <div>Loading list...</div>
        }

        return <div>No items for this list</div>
    }

    const fetchData = () => {
        console.log(state)
        fetch(`http://35.223.52.208/api/posts?offset=${state.offset}&pageSize=5&comPageSize=0`)
            .then(res => res.json())
            .then(data => {
                console.log(Array.from(data.items));
                setState(prevState => ({
                    hasMoreItems: data.hasNext,
                    offset: prevState.offset + 5,
                    postsData: [...prevState.postsData, ...Array.from(data.items)],
                    loading: false
                }))
                console.log(state)
            })
    }

    const divStyle = {
        height: 500
    };
    return (
        <div className='listContainer' style={{ height:500,margin:50,justifyContent:'center',justifyItems:'center' ,justifySelf:'center',overflow:'scroll' }} >
           
                <FlatList
                    list={state.postsData}
                    renderItem={(item: any) => <PostComponent key={item.post.id} data-testid="post-test" post={item} />}
                    renderWhenEmpty={showBlank}
                    hasMoreItems={state.hasMoreItems}
                    loadMoreItems={fetchData}

                />
            
        </div>
    )


}


export default PaginationList;


