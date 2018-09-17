import { fromJS } from "immutable";

const GET_PERSONAL_TODOS_LOADING = "GET_PERSONAL_TODOS_LOADING";
export const GET_PERSONAL_TODOS_SUCCESS = "GET_PERSONAL_TODOS_SUCCESS";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const initiateTodo = () => {};

export const getPersonalTodos = () => {
  return async dispatch => {
    dispatch({ type: GET_PERSONAL_TODOS_LOADING });
    fetch("/api/getData")
      .then(res => res.json())
      .then(jsonResult =>
        dispatch({
          type: GET_PERSONAL_TODOS_SUCCESS,
          todos: fromJS(jsonResult)
        })
      );
  };
};

export const SET_ACTIVE_LIST = "SET_ACTIVE_LIST";

export const setActiveList = listId => {
  return { type: SET_ACTIVE_LIST, listId };
};

export const SAVE_TODO_LIST = "SAVE_TODO_LIST";

export const saveToDoList = ({ listId, todos }) => {
  return async dispatch => {
    // await sleep(1000);

    // Send the update to Node
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open("POST", "/api/setData");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ listId, todos }));

    dispatch({ type: SAVE_TODO_LIST, listId, todos: fromJS(todos) });
  };
};
