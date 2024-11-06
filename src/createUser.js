import Todos from "./todos.js";

function createUser() {
  const userObj = {
    todos: [], 
    projects: [],
  };
  Todos.addTodo(userObj, "Create a todo", "Create your first todo!", new Date(), "medium");
  return userObj;
}

export default createUser;