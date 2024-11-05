import Todos from "./todos.js";

function createUser() {
  const userObj = {
    todos: [], 
    projects: [],
  };
  Todos.addTodo(userObj, "Create todo", "Create your first todo!", new Date(), 3);
  return userObj;
}

export default createUser;