import { displayAllTodos, displayTodayTodos, displayAllProjects, displayUserProjects } from "./changeDOM.js";
import handleEvents from "./handleEvents.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
    if (btn.classList[1] === "user-added") {
      btn.style.backgroundColor = btn.getAttribute("data-initial-color");
    }
  });
}

function display(user, btn) {
  const addTodoButton = document.querySelector(".add-todo");
  if (btn.classList.contains("today")) {
    addTodoButton.style.visibility = "visible";
    displayTodayTodos(user);
  } else if (btn.classList.contains("all-tasks")) {
    addTodoButton.style.visibility = "visible";
    displayAllTodos(user);
  } else if (btn.classList.contains("all-projects")) {
    addTodoButton.style.visibility = "hidden";
    displayAllProjects(user);
  } else {
    addTodoButton.style.visibility = "visible";
    btn.style.backgroundColor = "";
    displayUserProjects(user)
  }
}

export default function handleLeftButton(user, btn, leftButtons) {
  leftButtons = document.querySelectorAll(".left button");
  if (btn.classList.contains("add-project")) {
    return;
  }
  removeButtonLook(leftButtons);  
  btn.classList.add("new-style");  
  display(user, btn);   
  handleEvents.addRightTop(); 
}