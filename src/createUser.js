import Todos from "./todos.js";

function createUser() {
  const userObj = {
    todos: [], 
    projects: [],
  };
  const sampleTasks = [
    {
      title: "Create a todo",
      desc: "Create your first todo!",
      date: new Date(),
      priority: "low"
    },
    {
      title: "Brush teeth",
      desc: "Brush your teeth before bed!",
      date: new Date(),
      priority: "high"
    },
    {
      title: "Take dog for a walk",
      desc: "Take the dog for a walk at the park",
      date: new Date(),
      priority: "medium"
    }
  ]
  for (let i = 0; i < sampleTasks.length; i++) {
    Todos.addTodo(userObj, sampleTasks[i].title, sampleTasks[i].desc, sampleTasks[i].date, sampleTasks[i].priority);
  }
  return userObj;
}

export default createUser;