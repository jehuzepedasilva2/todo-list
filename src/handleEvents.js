import { displayTodayTodos } from "./changeDOM.js";
import CachedDOM from "./cachedDOM";

function crossOutTodo(card, todoObj) {
  const middle = card.querySelector(".todo-card-middle");
  middle.style.cssText = "flex-direction: row;";
  middle.innerHTML = `
    <h2 class="crossed-out">${todoObj.title}</h2>
  `;
  setTimeout(() => {
    middle.querySelector(".crossed-out").classList.add("cross-out-active");
  }, 10);
}

function undoCrossOutTodo(card, todoObj) {
  const middle = card.querySelector(".todo-card-middle");
  middle.style.cssText = "flex-direction: column;";  
  middle.innerHTML = `
    <h2 class="crossed-out">${todoObj.title}</h2>
    <h4>${todoObj.description}</h4>
  `;
  const titleElement = middle.querySelector(".crossed-out");
  titleElement.classList.remove("crossed-out");
  setTimeout(() => {
    titleElement.classList.remove("cross-out-active");
  }, 10);
}

function handleDeleteTodos(todos, i, user) {
  todos.splice(i, 1);
  displayTodayTodos(user);
}

function handleCheckbox(deleteButton, card, todoObj, checkbox) {
  deleteButton.style.cssText = "appearance: none; background: none; border: none;";
  if (checkbox.checked) {
    deleteButton.style.visibility = "visible";
    crossOutTodo(card, todoObj);
  } else {
    deleteButton.style.visibility = "hidden";
    undoCrossOutTodo(card, todoObj);
  }
}

function handleAddTodosModal() {
  const modal = CachedDOM.cachedModal;
  const openModalBtn = CachedDOM.cachedAddTodoButton;
  const closeModalBtn = document.querySelector(".close");

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }


}

export default (function eventHandler() {
  return {
    handleCheckbox,
    handleDeleteTodos,
    handleAddTodosModal
  }
})();