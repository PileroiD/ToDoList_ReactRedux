import AddTask from "../addTask/AddTask";
import SearchItem from "../searchItem/SearchItem";
import SortTasks from "../sortTasks/SortTasks";

import "./Actions.scss";

const Actions = ({
    addTask,
    searchTask,
    showAllTasks,
    sortTasks,
    wasSearched,
}) => {
    return (
        <div className="actions">
            <AddTask addTask={addTask} />
            <div className="searching">
                <SearchItem
                    searchTask={searchTask}
                    showAllTasks={showAllTasks}
                />
                <SortTasks sortTasks={sortTasks} />
            </div>
        </div>
    );
};

export default Actions;
