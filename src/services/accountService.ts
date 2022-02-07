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
        return axios.get(`${this.URI + "/" + usernameTry}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data
                } else {
                    console.log("Inside else service");
                   return response.data.message;
                }

            }).catch(err => {
                return err; //action
            });
    }

    saveAccount(Account1:Account) {
        return axios.put(`${this.URI + "/"}`, Account1)
            .then(response => {
                if (response.status === 200) {
                    return response.data
                } else {
                    console.log("Inside else service");
                   return response.data.message;
                }

            }).catch(err => {
                return err; //action
            });
    }


}

export default new AccountService();