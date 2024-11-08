import { displayAllTodos, displayTodayTodos, displayAllProjects } from "./changeDOM.js";
import handleEvents from "./handleEvents.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
  });
}

function display(user, btn) {
  if (btn.classList[0] === "today") {
    displayTodayTodos(user);
  } else if (btn.classList[0] === "all-tasks") {
    displayAllTodos(user);
  } else {
    displayAllProjects(user);
  }
}

export default function handleLeftButton(user, btn, leftButtons) {
  if (btn.classList.contains("add-project")) {
    handleEvents.handleAddProject(user);
    return;
  }
  removeButtonLook(leftButtons);    
  display(user, btn);   
  btn.classList.add("new-style"); 
  handleEvents.addRightTop(); 
}

// when you add to a project, you have to make you sure it only adds that task to the project page, use the fact that user object has a projects property 
// contains todos!