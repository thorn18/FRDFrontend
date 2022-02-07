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
import { AccountState } from '../../store/accountReducer';
import money from "../../images/money.jpg";


const LandingPage = () => {

  const dispatch = useDispatch();
  let user: any = useSelector((state: AppState) => state.userState.user);
  const [state, setState] = useState(0);
  const [transactionState, setTransactionState] = useState(0);

  const [ac1, setac1] = useState<Account | null>();
  const [ac2, setac2] = useState<Account | null>();


  const [accounts, setAccount] = useState([]);
  // let accounts: Account[] = useSelector((state: AccountState) => state.accounts);


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
            <button onClick={HandleAccountTransactionButton} className='Buttons'>New Transaction</button>
            <button onClick={HandleAccountTrasferButton} className='Buttons' id='TransferButton'>Account Transfer</button>
          </ol>
        </div>}
      {state > 0 &&
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
              <p id='AccountLabel'>Accounts:
                <img src={money} id='moneyimage'></img>
                <img src={money} id='moneyimage'></img>
                <img src={money} id='moneyimage'></img>
                <img src={money} id='moneyimage'></img>
              </p>

              {accounts && accounts.map((item: Account) => (
                <AccountComponent key={item.accountID} data-testid="post-test" post={item} />
              ))}
            </div>
          }

          {state == 3 &&
            <div id='TransactionDiv'>
              <h3 id='TransactionFormLabel'>Fill out Transaction Form:
                <form>
                  <span>Type Of Transaction:  </span>
                  <select name="TransactionType" id="TransactionTypeSelector" onChange={(val) => handleDropdownChange(val.target.value)}>
                    <option selected value="op0">Select an Option</option>
                    <option value="op1">Cash Withdral</option>
                    <option value="op2">Cash Deposit</option>
                    <option value="op3">Transfer Money</option>
                  </select>
                  {transactionState == 1 &&
                    <div>
                      <p>Select what Account you Want to Withdraw From: </p>
                      <select className='Account1Selector' onChange={(val) => handleWithdrawAccountChange(val.target.value)}>
                        {accounts.map((item: Account) => (
                          <option value={JSON.stringify(item)}>{item.accountID + "      " + item.type + "     " + item.balance}</option>
                        ))}
                      </select>
                      <p>Select Amount:</p>
                      <input type='number' id='account1WithdrawAmmount'></input>
                      <button id='transactionSubmitButton' onClick={handleWithdrawSubmit}>Submit</button>
                    </div>
                  }

                  {transactionState == 2 &&
                    <div>
                      <p>Select what Account you Want to Deposit Into: </p>
                      <select className='Account1Selector' onChange={(val) => handleDepositAccountChange(val.target.value)}>
                        {accounts.map((item: Account) => (
                          <option value={JSON.stringify(item)}>{item.accountID + "      " + item.type + "     " + item.balance}</option>
                        ))}
                      </select>
                      <p>Select Amount:</p>
                      <input type='number' id='account1DepositAmmount'></input>
                      <button id='transactionSubmitButton' onClick={handleDepositSubmit}>Submit</button>
                    </div>
                  }

                  {transactionState == 3 &&
                    <div>
                      <p>Select what Account you Want to Transfer From: </p>
                      <select className='Account1Selector' id='TransferAccount1' onChange={(val) => handleTransferAccount1Change(val.target.value)}>
                        {accounts.map((item: Account) => (
                          <option value={JSON.stringify(item)}>{item.accountID + "      " + item.type + "     " + item.balance}</option>
                        ))}
                      </select>
                      <p>Select Amount:</p>
                      <input type='number' id='Account1TransferAmount'></input>

                      <p>Select what Account you Want to Transfer To: </p>
                      <select className='Account2Selector' id='TransferAccount2' onChange={(val) => handleTransferAccount2Change(val.target.value)}>
                        {accounts.map((item: Account) => (
                          <option value={JSON.stringify(item)}>{item.accountID + "      " + item.type + "     " + item.balance}</option>
                        ))}
                      </select>
                      <p>Select Amount:</p>
                      <input type='number' id='Account2TransferAmount'></input>
                      <p></p>
                      <button id='transactionSubmitButton' onClick={handleTransactionSubmit}>Submit</button>
                    </div>
                  }
                </form>
              </h3>
            </div>
          }
        </div>
      }
    </div>
  )


  function HandleAccountInfoButton() {
    setState(1);
  }

  async function HandleAccountViewButton() {
    setState(2);
    let ac: any = await accountService.getAccounts(user.username);
    setAccount(ac);
  }

  async function HandleAccountTransactionButton() {
    setState(3);
    let ac: any = await accountService.getAccounts(user.username);
    setAccount(ac);
  }


  function handleDropdownChange(value: string) {
    switch (value) {
      case ("op0"): setTransactionState(0);
        break;

      case ("op1"): setTransactionState(1);
        break;

      case ("op2"): setTransactionState(2);
        break;

      case ("op3"): setTransactionState(3);
        break;

      default: setTransactionState(0);
    }
  }

  function handleWithdrawSubmit() {
    throw new Error('Function not implemented.');
  }

  function handleDepositSubmit() {
    throw new Error('Function not implemented.');
  }

  function handleTransactionSubmit() {
    throw new Error('Function not implemented.');
  }


  function handleWithdrawAccountChange(ac1: string) {
    let account1: Account = JSON.parse(ac1);
    setac1(account1);
    console.log(ac1);

  }

  function handleTransferAccount1Change(ac1: string) {
    let account1: Account = JSON.parse(ac1);
    setac1(account1);

  }

  function handleTransferAccount2Change(ac2: string) {
    let account2: Account = JSON.parse(ac2);
    setac2(account2);


  }

  function handleDepositAccountChange(ac1: string) {
    let account1: Account = JSON.parse(ac1);
    setac1(account1);

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


