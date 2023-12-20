import { useSelector } from "react-redux";
import Item from "../Item/Item";

import "./ItemsList.scss";
import { selectTasks } from "../../selectors/selectors";

const ItemsList = ({ updateTask, deleteTask }) => {
    const tasks = useSelector(selectTasks);

    const tasksList = tasks.map((task) => {
        return (
            <Item
                key={task.id}
                taskId={task.id}
                taskInfo={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        );
    });

    return <div className="task-wrapper">{tasksList}</div>;
};

export default ItemsList;
