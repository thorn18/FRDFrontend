import Account from "../models/Account";
import { accountActionTypes } from "./accountActions"

export interface AccountState {
    accounts: Array<Account>,
}

//initial states
export const initialAccountState: AccountState = {
    accounts: [] 
}

//reducers
const accountReducer = (state: AccountState = initialAccountState, action: any) => {
    console.log("Top of Account Reducer");
    switch (action.type) {
        case accountActionTypes.accountsLoaded:
            return { accounts: action.payload.accounts}
        case accountActionTypes.accountsEmpty:
            return { accounts: [] }
        default:
            return state;
    }
}

export default accountReducer;