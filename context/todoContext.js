import React, { createContext, useReducer } from "react";
import { initialState, todoReducer } from "./todoReducer";

import {
  addtodoApi,
  ADD_TODO_REQUEST_SUCCESS,
  ADD_TODO_REQUEST_FAILED,
  TODO_LOADING,
  gettodoApi,

  USER_TODO_REQUEST_SUCCESS,
  USER_TODO_REQUEST_FAILED,

  deleteTodoApi,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED,

  updatetodoApi,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILED,


} from "./actionTypes";
import toast from "react-hot-toast";
import axios from "../helper/api";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodoFunApi = async ({ data, onSuccess }) => {
    console.log("todo Api Data => ", data);
    dispatch({ type: TODO_LOADING });
    try {
      const response = await axios.post(addtodoApi, data);
      console.log("addtodo Api Response Data => ", response.data);
      if (response.data.status === "success") {
        toast.success("todo added successfully");
        dispatch({
          type: ADD_TODO_REQUEST_SUCCESS,
          payload: response.data.data,
        });
        if (onSuccess) {
          onSuccess(response.data.data.token);
        }
      } else {
        let err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        if (err === "Network Error") {
          err = "Please check your internet connection";
        }
        toast.error(err);
        dispatch({ type: ADD_TODO_REQUEST_FAILED, payload: err });
        throw err;
      }
    } catch (error) {
      consaddTodoFunApiole.error("addtodo error:", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      dispatch({ type: ADD_TODO_REQUEST_FAILED, payload: err });
      throw error;
    }
  };

  //////getusersbookingId///////////////////

  const getUserTodoFunApi = async ({ onSuccess }) => {
    dispatch({ type: TODO_LOADING });
    try {
      const response = await axios.get(gettodoApi);
      console.log("gettodoApi Response Data => ", response.data);
      if (response.data.status === "success") {
        dispatch({
          type: USER_TODO_REQUEST_SUCCESS,
          payload: response.data.data,
        });
        if (onSuccess) {
          onSuccess(response.data.data);
        }
      } else {
        let err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        if (err === "Network Error") {
          err = "Please check your internet connection";
        }
        toast.error(err);
        dispatch({ type: USER_BOOKING_LOADING_REQUEST_FAILED, payload: err });
        throw err;
      }
    } catch (error) {
      console.error("UserBookng error:", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      dispatch({ type: USER_TODO_REQUEST_FAILED, payload: err });
      throw error;
    }
  };


  const deleteTodoFunApi = async ({ todoId }) => {
    try {
      dispatch({ type: DELETE_TODO_REQUEST });

      const response = await axios.delete(deleteTodoApi(todoId));
      console.log("deleteTodo Api Response Data => ", response.data);
      if (response.data.status === "success") {
        toast.success("Todo deleted successfully");

        dispatch({
          type: DELETE_TODO_SUCCESS,
          payload: response.data.data,

        });

        window.location.reload();

      } else {
        let err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        if (err === "Network Error") {
          err = "Please check your internet connection";
        }
        toast.error(err);
        dispatch({ type: DELETE_TODO_FAILED, payload: err });
        throw err;
      }
    } catch (error) {
      console.error("deleteTodo error:", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      dispatch({ type: DELETE_TODO_FAILED, payload: err });

      throw error;
    }
  };

  ////////////  Cancel Booking /////////////
  const updateTodoFunApi = async ({ todoId, data, onSuccess }) => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    try {
      const response = await axios.put(updatetodoApi(todoId), data); 
      console.log("updateTodo Api Response Data => ", response.data);
      if (response.data.status === "success") {
        toast.success("Todo updated successfully");
        dispatch({
          type: UPDATE_TODO_SUCCESS,
          payload: response.data.data,
        });
        if (onSuccess) {
          onSuccess(response.data.data);
        }
      } else {
        let err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        if (err === "Network Error") {
          err = "Please check your internet connection";
        }
        toast.error(err);
        dispatch({ type: UPDATE_TODO_FAILED, payload: err });
        throw err;
      }
    } catch (error) {
      console.error("updateTodo error:", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      dispatch({ type: UPDATE_TODO_FAILED, payload: err });
      throw error;
    }
  };


  const contextValue = {
    ...state,
    dispatch,
    addTodoFunApi,
    getUserTodoFunApi,
    deleteTodoFunApi,
    updateTodoFunApi,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
export { TodoProvider, TodoContext };
