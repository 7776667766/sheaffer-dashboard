import {
  TODO_LOADING,
  ADD_TODO_REQUEST_SUCCESS,
  ADD_TODO_REQUEST_FAILED,

  USER_TODO_REQUEST_SUCCESS,
  USER_TODO_REQUEST_FAILED,

  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED,

  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILED,

} from "./actionTypes";

export const initialState = {
  todo: {
    data: [],
    isLoading: false,
    dataFetched: false,
    iserror: false,
  },
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_LOADING:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: true,
        },
      };

    case ADD_TODO_REQUEST_SUCCESS:
      return {
        ...state,
        todo: {
          isLoading: false,
          error: null,
          data: [...state.todo.data, action.payload],
        },
      };

    case ADD_TODO_REQUEST_FAILED:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: false,
          error: action.payload,
        },
      };

    case TODO_LOADING:
      return {
        ...state,
        booking: {
          ...state.booking,
          isLoading: true,
        },
      };

    case USER_TODO_REQUEST_SUCCESS:
      return {
        ...state,
        booking: {
          isLoading: false,
          error: null,
          dataFetched: true,
          data: action.payload,
        },
      };

    case USER_TODO_REQUEST_FAILED:
      return {
        ...state,
        booking: {
          ...state.booking,
          data: [],
          isLoading: false,
          dataFetched: true,
          error: action.payload,
        },
      };


    case USER_TODO_REQUEST_FAILED:
      return {
        ...state,
        booking: {
          ...state.booking,

          isLoading: false,
          dataFetched: true,
          error: action.payload,
        },
      };

    case DELETE_TODO_REQUEST:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: true,
        },
      };

    case DELETE_TODO_SUCCESS:
      const updatedTodos = state.todo.data.filter(
        (todo) => todo.id !== action.payload?.todoId
      );
      return {
        ...state,
        todo: {
          isLoading: false,
          error: null,
          data: updatedTodos,
        },
      };

    case DELETE_TODO_FAILED:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: false,
          error: action.payload,
        },
      };


    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: true,
        },
      };

    case UPDATE_TODO_SUCCESS:
      const updatedData = state.todo.data.map((todo) =>
        todo.id === action.payload.todoId ? action.payload.updatedTodo : todo
      );
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: false,
          error: null,
          data: updatedData,
        },
      };

    case UPDATE_TODO_FAILED:
      return {
        ...state,
        todo: {
          ...state.todo,
          isLoading: false,
          error: action.payload,
        },
      };


    default:
      return state;
  }
};
