import Todos from "./todos.js";
import { addTodosProj } from "./projects.js";
import "./styles.css";

function createUser() {
  const userObj = {
    todos: [], 
    projects: [],
  };
  Todos.addTodo(userObj, "Create todo", "Create your first todo!", new Date(), 3);
  return userObj;
}

const user = createUser();
Todos.addTodo(user, "eat", "eat something", new Date(), 1);
console.log(user);
addTodosProj(user, "eat", "eat something", new Date(), 1);
console.log(user);