import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import { UserState } from "../store/userReducer";
import "./AccountComponent.css";
import TransactionComponent from "./TransactionComponent";


interface accountProp {
    post: Account
}


function AccountComponent(props: accountProp) {

    const { post } = props;
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => { }, [])


    return (
        <div className="Container">
            <p className="Info">Account ID: {post.accountID}</p>
            <p className="Info">Account Type: {post.type}</p>
            <p className="Info">Account Balancee: {post.balance}</p>
            <div id='TransactionList'>
              {post.transactions && post.transactions.map((item: Transaction) => (
                <TransactionComponent key={item.transactionID} data-testid="transaction-test" transaction={item} />
              ))}
            </div>
        </div>
    );
}

export default AccountComponent;
