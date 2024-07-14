import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
const useTodo = () => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw "useBooking must be used within an BookingProvider";
  }

  return todoContext;
};

export default useTodo;
