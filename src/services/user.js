import axios from 'axios';
import {url} from './index';

export const getUser = async () => {
    try {
        const user = await axios.get(`${url}/user`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return user;
    } 
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }

}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/user/allUsers`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } 
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }

}

export const getFriends = async () => {
    try {
        const response = await axios.get(`${url}/user/friends`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } 
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }

}