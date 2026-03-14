export const Actions = {
    SET_LOADING: "SET_LOADING",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    SET_EXPENSES: "SET_EXPENSES",
    ADD_EXPENSE: "ADD_EXPENSE",
    SET_USERS: "SET_USERS"
};

export const SetLoading = (isLoading) => ({
    type: Actions.SET_LOADING,
    payload: isLoading
})

export const ChangeScreenAction = screen => ({
    type: Actions.CHANGE_SCREEN,
    payload: screen
})

export const SetExpenses = expenses => ({
    type: Actions.SET_EXPENSES,
    payload: expenses
})

export const AddExpense = expense => ({
    type: Actions.ADD_EXPENSE,
    payload: expense
})

export const SetUsers = users => ({
    type: Actions.SET_USERS,
    payload: users
})
