import CachedDOM from "./cachedDOM.js";
import { displayAllTodos, displayTodayTodos, displayAllProjects } from "./changeDOM.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
  });
}

function removeHeaderRightTop() {
  const rightTop = CachedDOM.cachedRightTop;
  rightTop.innerHTML = "";
}

function addDateRightTop() {
  removeHeaderRightTop();
  const rightTop = CachedDOM.cachedRightTop;
  const h1 = document.createElement("h1");
  const date = new Date().toDateString();
  h1.textContent = date
  rightTop.appendChild(h1);
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
  removeButtonLook(leftButtons);    
  display(user, btn);   
  btn.classList.add("new-style"); 
  addDateRightTop(); 
}