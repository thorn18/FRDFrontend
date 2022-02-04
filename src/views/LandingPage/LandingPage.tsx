import React, { useEffect, useState } from 'react';
import './LandingPage.css'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/initialState';
import User from '../../models/user';
import AccountComponent from '../../components/AccountComponent';
import Account from '../../models/Account';
import accountService from '../../services/accountService';
import { AccountAction } from '../../store/accountActions';

const LandingPage = () => {

  const dispatch = useDispatch();
  let user: any = useSelector((state: AppState) => state.userState.user);
  const [state, setState] = useState(0);
  let accounts: Account[] = useSelector((state: AppState) => state.accountState.accounts);


  useEffect(() => {
  });

  //Display a list of posts (PaginationList)
  //IF a user has deleted a post, display a modal which tells them if the post was deleted successfully or not
  return (
    <div data-testid='landing' id="landing">
      {user.role == "Account Holder" && <div className='WelcomeMessage'>Welcome back {user?.username}, we value your loyalty as an <span id='AH'>Account Holder</span></div>}
      {user.role == "Account Holder" &&
        <div className='TaskSelectorPanel'>
          <ol id='ButtonList'>
            <button onClick={HandleAccountInfoButton} className='Buttons'>Change Information</button>
            <button onClick={HandleAccountViewButton} className='Buttons'>View My Accounts</button>
            <button onClick={HandleAccountWithdrawalButton} className='Buttons'>Cash Withdrawal</button>
            <button onClick={HandleAccountTrasferButton} className='Buttons' id='TransferButton'>Account Transfer</button>
          </ol>
        </div>}
      <div className='TaskPanel'>
        {state == 1 &&
          <div id='AccountInfoDiv'>
            <p><span className="Labels">Your Username: </span>{user.username}      <button onClick={ChangeUsernameHandler}>change</button></p>
            <p><span className="Labels">Your Email: </span>{user.email}      <button onClick={ChangeEmailHandler}>change</button></p>
            <p><span className="Labels">Your Address: </span>{user.address}      <button onClick={ChangeAddressHandler}>change</button></p>
            <p><span className="Labels">Your Date of Birth: </span>{user.dob}      <button onClick={ChangeDOBHandler}>change</button></p>
          </div>
        }
        {state == 2 &&
          <div id='AccountsListDev'>
            {accounts.map((item: Account) => (
              <AccountComponent key={item.accountID} data-testid="post-test" post={item} />
            ))}
          </div>
        }
      </div>
    </div>
  )


  function HandleAccountInfoButton() {
    setState(1);
  }
  
  function HandleAccountViewButton() {
    setState(2);
    let user: any = useSelector((state: AppState) => state.userState.user);
    accountService.getAccounts(user.username);
  }
  
  function HandleAccountWithdrawalButton() {
    throw new Error('Function not implemented.');
  }
  
  function HandleAccountTrasferButton() {
    throw new Error('Function not implemented.');
  }
  
  function ChangeUsernameHandler() {
    throw new Error('Function not implemented.');
  }
  
  function ChangeEmailHandler() {
    throw new Error('Function not implemented.');
  }
  
  function ChangeAddressHandler() {
    throw new Error('Function not implemented.');
  }
  
  function ChangeDOBHandler() {
    throw new Error('Function not implemented.');
  }

}



export default LandingPage;


