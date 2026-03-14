import axios from 'axios';
import {url} from './index';

export const getExpenses = async (activeDate) => {
    try {
        const response = await axios.get(`${url}/expense?month=${activeDate.month}&year=${activeDate.year}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch(e) {
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

export const addExpense = async (name, amount, category, description, date, contributors, paidBy) => {
    try {
        const response = await axios.post(`${url}/expense`, {
            name,
            amount,
            description,
            date,
            category,
            contributors,
            paidBy
        },{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch(e) {
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}