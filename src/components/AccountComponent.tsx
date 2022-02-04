import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../models/Account";
import { UserState } from "../store/userReducer";

interface accountProp {
    post: Account
}


function AccountComponent(props: accountProp) {

    const { post } = props;
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => { }, [])


    return (
        <div>Hello</div>
    );
}

export default AccountComponent;
