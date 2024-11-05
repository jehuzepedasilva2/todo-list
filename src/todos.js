import dateToObj from "./dateConverter";

function createTodo(title, description, dueDate, priority) {
  return {
    title: title, 
    description: description,
    dueDate: dueDate,
    priority: priority,
  }
}

function deleteTodo({ todos }, index) {
  todos.splice(index, 1);
}

function updateTodo(obj, index, title, desc, dueDate, priority) {
  deleteTodo(obj, index);
  addTodo(obj, title, desc, dueDate, priority);
}

function addTodo({ todos }, title, description, dueDate, priority) {
  const date = dateToObj(dueDate);
  todos.push(
    createTodo(title, description, date, priority)
  );
}

export default (function Todos() {
  return {
    addTodo, 
    updateTodo, 
    deleteTodo
  }
})();