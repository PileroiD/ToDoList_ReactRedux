import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import ItemsList from "../components/itemsList/ItemsList";
import Actions from "../components/actions/Actions";
import TodoListService from "../services/TodoListService";
import { selectTasks, selectIsLoading } from "../selectors/selectors";

import { setIsLoading, setTasks, setWasSearched } from "../actions/actions";

function App() {
    const tasks = useSelector(selectTasks);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    const todoListService = new TodoListService();

    useEffect(() => {
        updateTasks();
    }, []);

    const updateTasks = () => {
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

    const addTask = (text) => {
        todoListService.addTask(text).finally(() => {
            updateTasks();
        });
    };

    const updateTask = (newtext, taskId) => {
        todoListService.updateTask(newtext, taskId).finally(() => {
            dispatch(setWasSearched(false));
            updateTasks();
        });
    };

    const searchTask = (searchingText) => {
        let newTasks = tasks
            .map((item) => {
                if (
                    item.text
                        .toLowerCase()
                        .includes(searchingText.toLowerCase())
                ) {
                    return item;
                }
            })
            .filter((item) => item !== undefined);

        dispatch(setTasks(newTasks));
    };

    const deleteTask = (taskId) => {
        todoListService.deleteTask(taskId).finally(() => {
            updateTasks();
            dispatch(setWasSearched(false));
        });
    };

    const showAllTasks = () => {
        updateTasks();
    };

    const sortTasks = () => {
        const tasksCopy = [...tasks];

        const sortedTasks = tasksCopy.sort((a, b) => {
            const textA = a.text.toLowerCase();
            const textB = b.text.toLowerCase();

            if (textA < textB) {
                return -1;
            } else if (textA > textB) {
                return 1;
            } else {
                return 0;
            }
        });

        dispatch(setTasks(sortedTasks));
    };

    return (
        <div className="app">
            <div className="container">
                <Actions
                    addTask={addTask}
                    searchTask={searchTask}
                    showAllTasks={showAllTasks}
                    sortTasks={sortTasks}
                />
                {isLoading ? (
                    <div className="loader"></div>
                ) : tasks.length ? (
                    <ItemsList
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ) : (
                    <div className="noTasks">No tasks</div>
                )}
            </div>
        </div>
    );
}

export default App;
