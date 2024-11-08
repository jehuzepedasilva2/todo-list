function createTodo(name, title, description, dueDate, priority) {
  return {
    title: title, 
    description: description,
    dueDate: dueDate,
    priority: priority,
    isComplete: false,
  }
}

function addTodosProj({ projects }, title, description, dueDate, priority) {
  projects.projectName.todos.push(
    createTodo(title, description, dueDate, priority)
  );
}

function addProjName({ projects }, name) {
  projects[name] = {
    todos: []
  };
}

export { addTodosProj, addProjName };