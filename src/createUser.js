import Todos from "./todos.js";

function createUser() {
  const userObj = {
    todos: [], 
    projects: [],
  };
  const todaysDate = new Date();
  const sampleTasks = [
    {
      title: "Create a Todo",
      desc: "Create your first todo by clicking the + button in the bottom-right corner!",
      date: todaysDate,
      priority: "high"
    },
    {
      title: "Create a Project",
      desc: "Create your first Project by clicking the + next to the Projects heading button in the left panel!",
      date: todaysDate,
      priority: "high"
    }
  ]
  for (let i = 0; i < sampleTasks.length; i++) {
    Todos.addTodo(userObj, sampleTasks[i].title, sampleTasks[i].desc, sampleTasks[i].date, sampleTasks[i].priority);
  }
  return userObj;
}

export default createUser;