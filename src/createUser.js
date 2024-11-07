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
      desc: "Create your first todo... Click on the '+' in the bottom-right corner to add new todo!",
      date: todaysDate,
      priority: "low"
    },
    {
      title: "Finish Odin Course",
      desc: "Aim to finish the Odin course by next year!",
      date: new Date(todaysDate.getFullYear()+1, 1, 1),
      priority: "high"
    },
    {
      title: "Go to the Gym",
      desc: "Go get a workout in!",
      date: new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()+1),
      priority: "medium"
    }
  ]
  for (let i = 0; i < sampleTasks.length; i++) {
    Todos.addTodo(userObj, sampleTasks[i].title, sampleTasks[i].desc, sampleTasks[i].date, sampleTasks[i].priority);
  }
  return userObj;
}

export default createUser;