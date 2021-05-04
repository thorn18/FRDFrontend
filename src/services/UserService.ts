import axios from 'axios';
import { userActionTypes, loginSuccess, loginError } from '../store/actions';
import decode from 'jwt-decode';

class UserService {
    private URI: string;
    //URL of the API
    constructor() {
        this.URI = 'http://34.67.233.119/api/auth/login';
    }

    login(usernameTry: string, passwordTry: string) {
        return (dispatch: (arg0: { type: userActionTypes; payload?: any; }) => void) => {
            return axios.post(`${this.URI}`, { username: usernameTry, password: passwordTry })
                .then(response => {
                    console.log(response);
                    let decoded:any = decode(response.data.token);
                    localStorage.setItem("token",response.data.token);
                    dispatch(loginSuccess(decoded)); //retrieve token
                }).catch(err => {
                    console.log(err);
                    dispatch(loginError(err)); //action
                });
        };
    }
}

export default new UserService;