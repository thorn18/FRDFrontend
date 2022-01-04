import axios from 'axios';
import { loginSuccess, loginError, UserAction } from "../store/userActions";
import decode from 'jwt-decode';

class UserService {
    private URI: string;
    //URL of the API
    constructor() {
        this.URI = 'http://Photonbackend-env.eba-c6syafi3.us-east-2.elasticbeanstalk.com/api/login';
    }

    login(usernameTry: string, passwordTry: string) {
        return (dispatch: (action: UserAction) => void) => {
            return axios.post(`${this.URI}`, { username: usernameTry, password: passwordTry })
                .then(response => {
                    if (response.status === 200) {
                        let decoded: any = decode(response.data.token);
                        localStorage.setItem("id_token", response.data.token); 
                        dispatch(loginSuccess(decoded.nameid, response.data.token)); //retrieve token
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