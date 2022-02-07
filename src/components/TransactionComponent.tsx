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
        <div></div>
    )
}

export default TransactionComponent;