import Account from "../models/Account";
import { userActionTypes } from "./userActions";
import {accountActionTypes} from "./accountActions"

export interface AccountState {
    accounts:Account[],
}

//initial states
export const initialAccountState: AccountState = {
    accounts : []
}

//reducers
const accountReducer = (state: AccountState = initialAccountState, action: any) => {
    switch(action.type) {
        case accountActionTypes.accountsLoaded:
            return {accounts:action.payload.accounts}
        case accountActionTypes.accountsEmpty:
            return {accounts:[]}
        default:
            return state;
    }
}

export default accountReducer;