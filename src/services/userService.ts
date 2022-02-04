import axios from 'axios';
import { loginSuccess, loginError, UserAction } from "../store/userActions";
import decode from 'jwt-decode';
import User from '../models/user';

class UserService {
    private URI: string;
    //URL of the API
    constructor() {
        this.URI = 'http://localhost:5000/api/users/login';
    }

    login(usernameTry: string, passwordTry: string) {
        return (dispatch: (action: UserAction) => void) => {
            return axios.post(`${this.URI}`, { username: usernameTry, password: passwordTry })
                .then(response => {
                    if (response.status === 200) {
                        dispatch(loginSuccess(response.data));
                    } else {
                        dispatch(loginError(response.data.message));
                    }

                }).catch(err => {
                    dispatch(loginError(err)); //action
                });
        };
    }
}

export default new UserService();