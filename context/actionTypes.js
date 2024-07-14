  export const TODO_LOADING = "TODO_LOADING";

  export const addtodoApi = "todo/add";
  export const ADD_TODO_REQUEST_SUCCESS = "ADD_TODO_REQUEST_SUCCESS";
  export const ADD_TODO_REQUEST_FAILED = "ADD_TODO_REQUEST_FAILED";

  export const gettodoApi = "todo/get";
  export const USER_TODO_REQUEST_SUCCESS =
    "USER_TODO_REQUEST_SUCCESS";
  export const USER_TODO_REQUEST_FAILED =
    "USER_TODO_REQUEST_FAILED";

export const deleteTodoApi = (todoId) => `/todo/delete/${todoId}`;

export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILED = "DELETE_TODO_FAILED";

export const updatetodoApi = (todoId) => `/todo/update/${todoId}`;

export const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAILED = "UPDATE_TODO_FAILED";