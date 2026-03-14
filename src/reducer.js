import { Actions } from "./actions";

const rootReducer = (state, action) => {
    switch (action.type) {
        case Actions.SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case Actions.CHANGE_SCREEN: {
            return {
                ...state,
                screen: action.payload
            }
        }
        case Actions.SET_EXPENSES: {
            return {
                ...state,
                expenses: action.payload
            }
        }
        case Actions.ADD_EXPENSE: {
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    action.payload
                ]
            }
        }
        case Actions.SET_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        default:
            return state;
    }
};

export default rootReducer;
