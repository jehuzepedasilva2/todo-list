function createTodo(title, description, dueDate, priority) {
  return {
    title: title, 
    description: description,
    dueDate: dueDate,
    priority: priority,
    isComplete: false,
  }
}

function addTodosProj({ projects }, name, title, description, dueDate, priority) {
  projects[name].todos.push(
    createTodo(title, description, dueDate, priority)
  );
}

function addProjName({ projects }, name) {
  projects[name] = {
    name: name,
    todos: []
  };
}

export { addTodosProj, addProjName };