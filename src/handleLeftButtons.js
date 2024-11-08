import { displayAllTodos, displayTodayTodos, displayAllProjects } from "./changeDOM.js";
import handleEvents from "./handleEvents.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
    if (btn.classList[1] === "user-added") {
      btn.style.backgroundColor = btn.getAttribute("data-initial-color");
      console.log(btn.getAttribute("data-initial-color"));
    }
  });
}

function display(user, btn) {
  if (btn.classList[0] === "today") {
    displayTodayTodos(user);
  } else if (btn.classList[0] === "all-tasks") {
    displayAllTodos(user);
  } else if (btn.classList[0] === "all-projects") {
    displayAllProjects(user);
  } else {
    btn.style.backgroundColor = "";
    console.log("not implemented yet, line 18 in display (handleLeftButtons)");
    // displayUserProject(user)
  }
}

export default function handleLeftButton(user, btn, leftButtons) {
  leftButtons = document.querySelectorAll(".left button");
  if (btn.classList.contains("add-project")) {
    return;
  }
  console.log(leftButtons);
  removeButtonLook(leftButtons);   
  console.log(leftButtons); 
  display(user, btn);   
  btn.classList.add("new-style"); 
  handleEvents.addRightTop(); 
}