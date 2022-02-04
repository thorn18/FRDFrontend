import Account from "../models/Account";

export interface AccountAction {
    type: accountActionTypes;
    payload?: Error | Object | Account[];
}

export enum accountActionTypes {
    accountsLoaded = "ACCOUNTS_LOADED",
    accountsEmpty = "ACCOUNTS_EMPTY"
}

export const accountsLoaded = (accounts:Account[]) => {
    return {
        type: accountActionTypes.accountsLoaded,
        payload: { accounts }
    };
};

export const accountsEmpty = (accounts: Account[]) => {
    return {
        type: accountActionTypes.accountsEmpty,
        payload: accounts
    };
};