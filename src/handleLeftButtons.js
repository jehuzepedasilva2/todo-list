import {
  displayAllTodos,
  displayTodayTodos,
  displayAllProjects,
  displayUserProjects,
} from "./changeDOM.js";
import handleEvents from "./handleEvents.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach((btn) => {
    btn.classList.remove("new-style");
    if (btn.classList[1] === "user-added") {
      btn.style.backgroundColor = btn.getAttribute("data-initial-color");
    }
  });
}

function display(user, btn) {
  const addTodoButton = document.querySelector(".add-todo");
  addTodoButton.style.visibility = "visible";
  if (btn.classList.contains("today")) {
    displayTodayTodos(user);
  } else if (btn.classList.contains("all-tasks")) {
    displayAllTodos(user);
  } else if (btn.classList.contains("all-projects")) {
    addTodoButton.style.visibility = "hidden"; // don't allow button to be used in the All Projects tab
    displayAllProjects(user);
  } else {
    btn.style.backgroundColor = "";
    displayUserProjects(user, btn.classList[0]);
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
