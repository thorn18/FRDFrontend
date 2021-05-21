import React from 'react';
import PaginationList from '../../components/Post/PaginationList';
import './LandingPage.css'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/postReducer';
import { resetPostState } from '../../store/postActions';

const LandingPage = () => {
  const dispatch = useDispatch();
  let deleted: boolean = useSelector((state: AppState) => state.postsState.deleted);
  let loading: boolean = useSelector((state: AppState) => state.postsState.loading);
  let error: any = useSelector((state: AppState) => state.postsState.error);

  function closeModal() {
    dispatch(resetPostState());
  }
  function displayStatus() {
    console.log('STATUS ', error)
    if (loading) {
      return <p data-testid='deletingMessage'>Deleting...</p>
    } else if (error === undefined) {
      return <p data-testid='deletedSuccessMessage'>Post deleted</p>
    } else {
      return <p data-testid='deletedFailedMessage'>There is an error</p>
    }
  }

  //Display a list of posts (PaginationList)
  //IF a user has deleted a post, display a modal which tells them if the post was deleted successfully or not
  return (
    <div data-testid='landing' id="landing">
      <Modal
        isOpen={deleted}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //style={customStyles}
        contentLabel="Deleted Post Modal"
        className="model"
        data-testid='deletedPostModal'
        ariaHideApp={false}
      >
        {displayStatus()}
        <button data-testid='closeModalButton' className="modal-btn" onClick={closeModal}>X</button>
      </Modal>
      <PaginationList />
    </div>
  )
}

export default LandingPage;