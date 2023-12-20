import "./SearchItem.scss";
import { useState } from "react";
import searchIcon from "../../resorces/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectWasSearched } from "../../selectors/selectors";

const SearchItem = ({ searchTask, showAllTasks }) => {
    const [searchText, setSearchText] = useState("");
    const wasSearched = useSelector(selectWasSearched);

    const dispatch = useDispatch();

    const onValueChangeSearch = ({ target }) => {
        setSearchText(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (searchText && searchText.length < 60) {
            searchTask(searchText);
            setSearchText("");
            dispatch({
                type: "SET_WAS_SEARCH",
                payload: { wasSearched: true },
            });
        }
    };

    const onClickShowAllTasks = () => {
        showAllTasks();
        dispatch({
            type: "SET_WAS_SEARCH",
            payload: { wasSearched: false },
        });
    };

    return (
        <form onSubmit={onSubmit} className="searchItem">
            <input
                required
                type="text"
                className="searchItem-input"
                placeholder="Search task"
                value={searchText}
                onChange={onValueChangeSearch}
            />
            <button className="searchItem-button" type="submit">
                <img src={searchIcon} alt="searchIcon" />
            </button>
            {wasSearched && (
                <div className="searchItem-showAll">
                    <button
                        onClick={onClickShowAllTasks}
                        className="searchItem-showAll-button"
                    >
                        Show all tasks
                    </button>
                </div>
            )}
        </form>
    );
};

export default SearchItem;
