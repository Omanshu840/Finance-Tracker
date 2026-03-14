import axios from 'axios';
import {url} from './index';

export const LogIn = async (email, password) => {
    try {
        const response = await axios.post(`${url}/signin`, {email, password});
        return response.data
    }
    catch (e){
        if (e.response.data) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

export const signUp = async (name, email, password) => {
    try {
        const signUpStatus = await axios.post(`${url}/signup`, {name, email, password});
        return signUpStatus.data
    }
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}