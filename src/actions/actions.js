export const setIsLoading = (IS_LOADING) => {
    return { type: "SET_IS_LOADING", payload: { isLoading: IS_LOADING } };
};

export const setTasks = (TASKS) => {
    return { type: "SET_TASKS", payload: { tasks: TASKS } };
};

export const setWasSearched = (WAS_SEARCHED) => {
    return { type: "SET_WAS_SEARCH", payload: { wasSearched: WAS_SEARCHED } };
};
