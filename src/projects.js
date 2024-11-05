import dateToObj from "./dateConverter";

function createTodo(title, description, dueDate, priority) {
  return {
    title: title, 
    description: description,
    dueDate: dueDate,
    priority: priority,
  }
}

function addTodosProj({ projects }, title, description, dueDate, priority) {
  const date = dateToObj(dueDate);
  projects.push(
    createTodo(title, description, dueDate, priority)
  );
}

export { addTodosProj };