import axios from 'axios';

const url = "https://finance-tracker.cyclic.cloud"
// const url = "http://localhost:3001"

const getUser = async () => {
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

const LogIn = async (email, password) => {
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

export const getExpenses = async () => {
    try {
        const response = await axios.get(`${url}/expense`, {
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

export const addExpense = async (name, amount, category, description, date) => {
    try {
        const response = await axios.post(`${url}/expense`, {
            name,
            amount,
            description,
            date,
            category
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

const signUp = async (firstname, lastname, username, email, password) => {
    try {
        const signUpStatus = await axios.post(`${url}/auth/signup`, {firstname, lastname, username, email, password});
        return signUpStatus.data
    }
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

const getCourseByCode = async (CourseCode) => {
    try {
        const courseStatus = await axios.get(`${url}/course/${CourseCode}`);
        return courseStatus.data;
    }
    catch {
        return null;
    }
}

const getCourseByBranch = async (branchId) => {
    try {
        const courseStatus = await axios.get(`${url}/courses/${branchId}`);
        return courseStatus.data;
    }
    catch {
        return [];
    }
}

const getResourceByCourse = async (courseId) => {
    try {
        const resourceStatus = await axios.get(`${url}/resources/${courseId}`);
        return resourceStatus.data;
    }
    catch {
        return {resources: []};
    }
}

const addResource = async (courseId, formData) => {
    try {
        const resourceStatus = await axios.post(`${url}/resources/${courseId}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        return resourceStatus.data;
    }
    catch (e) {
        if (e.response) {
            return {error: e.response.data.error};
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

export {
    getUser,
    LogIn,
    signUp,
    getCourseByCode,
    getCourseByBranch,
    getResourceByCourse,
    addResource,
}