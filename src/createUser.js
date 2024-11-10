import Todos from "./todos.js";
import { addProjName, addTodosProj } from "./projects.js";
import handleEvents from "./handleEvents.js";
import { getThemeFromStorage, getUserFromStorage } from "./loadUser.js";

function loadUser() {
  let userObj = getUserFromStorage();
  if (!userObj) {
   userObj = createTestUser();
  }

  console.log(userObj);
  for (const projName in userObj.projects) {
    if (projName === "MyProject") {
      continue;
    }
    const c = userObj.projects[projName].c
    handleEvents.addButtonToLeftContentThree(projName, projName, userObj, c);
  }

  let theme = getThemeFromStorage();

  return {
    userObj,
    theme,
  }
}

function createTestUser() {
  const userObj = {
    todos: [], 
    projects: {},
  };
  const todaysDate = new Date();
  const sampleTasks = [
    {
      title: "Create a Todo",
      desc: "Create your first to do by clicking the + button in the bottom-right corner!",
      date: todaysDate,
      priority: "high"
    },
    {
      title: "Create a Project",
      desc: "Create your first Project by clicking the + next to the Projects heading!",
      date: todaysDate,
      priority: "high"
    }
  ]


  for (let i = 0; i < sampleTasks.length; i++) {
    Todos.addTodo(userObj, sampleTasks[i].title, sampleTasks[i].desc, sampleTasks[i].date, sampleTasks[i].priority);
  }

  const projName = "MyProject"
  const sampleProjects = [
    {
      title: "Add tasks to MyProject",
      desc: "Create your first Project tasks by clicking the the + button in the bottom-right corner of the MyProject tab!",
      date: todaysDate,
      priority: "high"
    }
  ]

  addProjName(userObj, projName);

  for (let i = 0; i < sampleProjects.length; i++) {
    addTodosProj(userObj, projName, sampleProjects[i].title, sampleProjects[i].desc, sampleProjects[i].date, sampleProjects[i].priority);
    handleEvents.addButtonToLeftContentThree(projName, projName, userObj);
  }

  return userObj;
}

export { createTestUser, loadUser };

// issue find a way to save the color of each tav