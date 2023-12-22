import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { appReducer } from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk))
);
