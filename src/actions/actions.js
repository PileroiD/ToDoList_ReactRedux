import TodoListService from "../services/TodoListService";

const todoListService = new TodoListService();

export const setIsLoading = (IS_LOADING) => {
    return { type: "SET_IS_LOADING", payload: { isLoading: IS_LOADING } };
};

export const setTasks = (TASKS) => {
    return { type: "SET_TASKS", payload: { tasks: TASKS } };
};

export const setWasSearched = (WAS_SEARCHED) => {
    return { type: "SET_WAS_SEARCH", payload: { wasSearched: WAS_SEARCHED } };
};

export const setAllTasksAction = (dispatch) => {
    dispatch(setIsLoading(true));
    todoListService
        .getAllTasks()
        .then((data) => {
            dispatch(setTasks(data));
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        });
};

export const addTaskAction = (text) => {
    return (dispatch) => {
        todoListService.addTask(text).finally(() => {
            setAllTasksAction(dispatch);
        });
    };
};

export const updateTaskAction = (newtext, taskId) => {
    return (dispatch) => {
        todoListService.updateTask(newtext, taskId).finally(() => {
            dispatch(setWasSearched(false));
            setAllTasksAction(dispatch);
        });
    };
};

export const deleteTaskAction = (taskId) => {
    return (dispatch) => {
        todoListService.deleteTask(taskId).finally(() => {
            dispatch(setWasSearched(false));
            setAllTasksAction(dispatch);
        });
    };
};
