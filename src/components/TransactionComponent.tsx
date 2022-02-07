import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import { UserState } from "../store/userReducer";
import "./TransactionComponent.css";


interface TransactionProp {
    transaction: Transaction
}


function TransactionComponent(props: TransactionProp) {

    const { transaction } = props;
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => { }, [])

    return (
        <div className="Container">
            <p className="TransactionInfo">Date of Transaction: {transaction.transactionDate}</p>
            <p className="TransactionInfo">Transaction ID: {transaction.transactionID}</p>
            <p className="TransactionInfo">Transaction Type: {transaction.type}</p>
            <p className="TransactionInfo">Transaction Type: {transaction.transactionString}</p>
        </div>
    )
}

export default TransactionComponent;