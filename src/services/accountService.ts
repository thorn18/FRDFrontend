import axios from 'axios';
import decode from 'jwt-decode';
import Account from '../models/user';
import { AccountAction, accountsEmpty, accountsLoaded } from '../store/accountActions';

class AccountService {
    private URI: string;
    //URL of the API
    constructor() {
        this.URI = `http://localhost:5000/api/accounts`;
    }

    getAccounts(usernameTry: string) {
        return (dispatch: (action: AccountAction) => void) => {
            return axios.post(`${this.URI + "/" + usernameTry}`, { username: usernameTry})
                .then(response => {
                    if (response.status === 200) {
                        dispatch(accountsLoaded(response.data));
                    } else {
                        dispatch(accountsEmpty(response.data.message));
                    }

                }).catch(err => {
                    dispatch(accountsEmpty(err)); //action
                });
        };
    }


}

export default new AccountService();