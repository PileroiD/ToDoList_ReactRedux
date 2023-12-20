export const initialState = {
    tasks: [],
    isLoading: false,
    wasSearched: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_LOADING":
            return { ...state, isLoading: action.payload.isLoading };
        case "SET_TASKS":
            return { ...state, tasks: action.payload.tasks };
        case "SET_WAS_SEARCH":
            return { ...state, wasSearched: action.payload.wasSearched };
        default:
            return state;
    }
};
