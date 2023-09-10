export const Actions = {
    CHANGE_SCREEN: "CHANGE_SCREEN",
    SET_EXPENSES: "SET_EXPENSES",
    ADD_EXPENSE: "ADD_EXPENSE"
};

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
