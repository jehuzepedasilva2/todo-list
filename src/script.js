import { addTodosProj } from "./projects.js";
import Todos from "./todos.js";
import CreateUser from "./createUser.js";
import "./styles.css";

const user = CreateUser();
Todos.addTodo(user, "eat", "eat something", new Date(), 1);
console.log(user);
addTodosProj(user, "eat", "eat something", new Date(), 1);
console.log(user);