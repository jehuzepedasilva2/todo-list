import { displayTodayTodos, displayAllTodos } from "./changeDOM.js";
import Todos from "./todos.js";
import CachedDOM from "./cachedDOM";

function crossOutTodo(card, todoObj, isRerender) {
  const middle = card.querySelector(".todo-card-middle");
  middle.style.cssText = "flex-direction: row;";
  middle.innerHTML = `
    <h2 class="crossed-out">${todoObj.title}</h2>
  `;
  if (!isRerender) {
    setTimeout(() => {
      middle.querySelector(".crossed-out").classList.add("cross-out-active");
    }, 10);
  } else {
    middle.querySelector(".crossed-out").classList.add("cross-out-active");
  }
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
  displayAllTodos(user);
}

function handleCheckbox(deleteButton, card, todoObj, checkbox, isRerender=false) {
  deleteButton.style.cssText = "appearance: none; background: none; border: none;";
  if (checkbox.checked) {
    deleteButton.style.visibility = "visible";
    todoObj.isComplete = true;
    crossOutTodo(card, todoObj, isRerender);
  } else {
    deleteButton.style.visibility = "hidden";
    undoCrossOutTodo(card, todoObj);
    todoObj.isComplete = false;
  }
}

function handleModalCalenderUpdate() {
  const modal = CachedDOM.cachedModal;
  const dateArea = modal.querySelector('#task-date');
  const todaysDate = new Date();
  dateArea.setAttribute("value", `${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`);
  dateArea.setAttribute("min", `${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`);
}

function clearModal(modal) {
  const inputArea = modal.querySelector('#task-name');
  const textArea = modal.querySelector('#task-description');
  const dateArea = modal.querySelector('#task-date');
  const prioritySelect = modal.querySelector('#priority-select');

  if (inputArea) inputArea.value = '';
  if (textArea) textArea.value = '';
  if (dateArea) dateArea.value = '';
  if (prioritySelect) prioritySelect.selectedIndex = 0;

  modal.style.display = 'none';
}

function handleSaveModal(userObj, modal) {
  const inputAreaValue = modal.querySelector('#task-name').value;
  const textAreaValue = modal.querySelector('#task-description').value;
  const dateArea = modal.querySelector('#task-date').value;
  const prioritySelectValue = modal.querySelector('#priority-select').value;
  const [year, month, date] = dateArea.split("-");
  Todos.addTodo(userObj, inputAreaValue, textAreaValue, new Date(year, month-1, date), prioritySelectValue);
  displayAllTodos(userObj);
  clearModal(modal);
}

function handleAddTodosModal(userObj) {
  const modal = CachedDOM.cachedModal;
  const openModalBtn = CachedDOM.cachedAddTodoButton;
  const closeModalBtn = document.querySelector(".close");
  const saveButton = CachedDOM.cachedModalSaveButton;

  saveButton.addEventListener("click", () => handleSaveModal(userObj, modal));

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  closeModalBtn.onclick = function() {
    clearModal(modal);
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      clearModal(modal)
      modal.style.display = "none";
    }
  }

}

export default (function eventHandler() {
  return {
    handleCheckbox,
    handleDeleteTodos,
    handleAddTodosModal,
    handleModalCalenderUpdate, 
  }
})();