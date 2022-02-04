import { initialUserState, UserState } from './userReducer';

import {initialAccountState, AccountState} from './accountReducer';

export interface AppState {
    accountState: AccountState,
    userState: UserState
}

const initialState: AppState = {
    userState: initialUserState,
    accountState: initialAccountState
}