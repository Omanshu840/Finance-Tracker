import * as user from './user';
import * as expense from './expense';
import * as auth from './auth';

// export const url = "https://finance-tracker.cyclic.cloud"
export const url = "http://localhost:3001"

const services = {
    ...user,
    ...expense,
    ...auth
}

export default services;