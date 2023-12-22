import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import ItemsList from "../components/itemsList/ItemsList";
import Actions from "../components/actions/Actions";
import { selectTasks, selectIsLoading } from "../selectors/selectors";
import {
    setTasks,
    setAllTasksAction,
    addTaskAction,
    updateTaskAction,
    deleteTaskAction,
} from "../actions/actions";

function App() {
    const tasks = useSelector(selectTasks);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        updateTasks();
    }, []);

    const updateTasks = () => {
        dispatch(setAllTasksAction);
    };

    const addTask = (text) => {
        dispatch(addTaskAction(text));
    };

    const updateTask = (newtext, taskId) => {
        dispatch(updateTaskAction(newtext, taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(deleteTaskAction(taskId));
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
