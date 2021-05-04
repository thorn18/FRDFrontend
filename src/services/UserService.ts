import axios from 'axios';
import {userActionTypes, loginSuccess, loginError} from '../store/actions';

class UserService {
    private URI: string;
    //URL of the API
    constructor() {
        this.URI = 'http://34.67.233.119/api/auth/login';
    }

    login(usernameTry: string, passwordTry: string){
        return (dispatch: (arg0: { type: userActionTypes; payload?: any; }) => void) => {
            return axios.post(`${this.URI}`, {username: usernameTry, password: passwordTry}) 
            .then(response => {
                dispatch(loginSuccess(response.data.token)); //retrieve token
            }).catch(err => {
                dispatch(loginError(err)); //action
            });
        };
    }
}

export default new UserService;