import { displayTodayTodos, displayAllTodos, displayAllProjects, addRightTop } from "./changeDOM.js";
import createUser from "./createUser.js";
import handleLeftButton from "./handleLeftButtons.js";
import Todos from "./todos.js";
import CachedDOM from "./cachedDOM";

const lightTheme = {
  '--bg-color': '#FFFFFF',
  '--left-bg-color': '#F3F4F6',
  '--right-bg-color': '#E5E7EB',
  '--right-top-bg-color': '#D1D5DB',
  '--right-content-bg-color': '#E5E7EB',
  '--card-color': '#F9FAFB',
  '--primary-color': '#58A6FF',
  '--accent-color': '#D97706',
  '--text-color': '#1F2937',
  '--highlight-color': '#10B981',
  '--completed-task-color': '#6EE7B7',
  '--svg-fill-color': '#1c1d1d',
  '--modal-bg-color': '#E5E7EB',
  '--text-color-modal': '#1F2937',
  '--high-priority-border-color': '#EF4444',
  '--medium-priority-border-color': '#F59E0B',
  '--low-priority-border-color': '#34D399',
  '--crossed-out-text': '#9CA3AF7d',
  '--box-shadow-cards-01': 'rgba(0, 0, 0, 0.1)',
  '--box-shadow-cards-02': 'rgba(0, 0, 0, 0.2)',
  '--completed-all-todo-bg': 'rgba(34, 197, 94, 0.1)'
};

const darkTheme = {
  '--bg-color': '#0D1117',
  '--primary-color': '#58A6FF',
  '--accent-color': '#F0A500',
  '--text-color': '#FFFFFF',
  '--highlight-color': '#3FB950',
  '--completed-task-color': '#34D399',
  '--left-bg-color': '#161B22',
  '--right-bg-color': '#0D1117',
  '--right-top-bg-color': '#1A1E26',
  '--right-content-bg-color': '#0D1117',
  '--svg-fill-color': '#FFFFFF',
  '--card-color': '#1F252C',
  '--high-priority-border-color': '#FF4D4D',
  '--medium-priority-border-color': '#FFB347',
  '--low-priority-border-color': '#4CAF50',
  '--crossed-out-text': '#8381817d',
  '--modal-bg-color': '#3f4249',
  '--text-color-modal': '#161B22',
  '--box-shadow-cards-01': 'rgba(0, 0, 0, 0.3)',
  '--box-shadow-cards-02': 'rgba(0, 0, 0, 0.5)',
  '--completed-all-todo-bg': 'rgba(0, 128, 0, 0.1)'
};

function start() {
  const leftButtons = CachedDOM.cachedLeftButtons;
  const userObj = createUser();
  leftButtons.forEach(btn => {
    btn.addEventListener("click", () => handleLeftButton(userObj, btn, leftButtons));
  });
  handleLeftButton(userObj, leftButtons[0], leftButtons); // start off at today
  startTheme(1);
  handleModalCalenderUpdate();
  handleAddTodosModal(userObj);
}

function startTheme(x) {
  if (x === 1) {
    applyTheme(lightTheme);
  } else {
    applyTheme(darkTheme);
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach(property => {
    root.style.setProperty(property, theme[property]);
  });
}

function handleCloudScene() {
  const cloudScene = document.querySelector(".clouds")
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  cloudScene.addEventListener("click", () => {
    if (sun.classList.contains("vis")) {
      sun.classList.remove("vis");
      moon.classList.add("vis");
      applyTheme(darkTheme);
    } else {
      moon.classList.remove("vis");
      sun.classList.add("vis");
      applyTheme(lightTheme);
    }
  })
}

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

// here logic will have to change when we have more projects, how to ensure that we display to the correct tab? have a unique id for each tab
// is probably the move here, we iterate over the tabs and find the one that also has the new-style class, then make a function in 
// changeDOM that takes in the user obj and the the tab that we want to display in.
function chooseTab(user, originTab) {
  if (originTab === "today") {
    displayTodayTodos(user)
  } else if (originTab === "all-tasks") {
    displayAllTodos(user);
  } else {
    displayAllProjects(user);
  }
}

function handleDeleteTodos(todos, i, user) {
  todos.splice(i, 1);
  const originTab = document.querySelector(".new-style").classList[0];
  chooseTab(user, originTab);
}

function handleCheckbox(deleteButton, card, todoObj, checkbox, isReRender=false) {
  deleteButton.style.cssText = "appearance: none; background: none; border: none;";
  if (checkbox.checked) {
    deleteButton.style.visibility = "visible";
    todoObj.isComplete = true;
    crossOutTodo(card, todoObj, isReRender);
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
  const originTab = document.querySelector(".new-style").classList[0];
  chooseTab(userObj, originTab);
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

function handleAllTaskCompleteButton(todoObj, button, card) {
  if (!button.classList.contains("c")) {
    todoObj.isComplete = true;
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#008000">
        <path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/>
      </svg>
    `;
    button.classList.add("c");
    card.classList.add("checked");
  } else {
    todoObj.isComplete = false;
    button.classList.remove("c");
    card.classList.remove("checked")
    button.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
          <path d="M480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/>
      </svg>
    `;
  }
}

function handleAllTaskDeleteButton(todos, i, user) {
  handleDeleteTodos(todos, i, user);
}

export default (function eventHandler() {
  return {
    handleCheckbox,
    handleDeleteTodos,
    handleAddTodosModal,
    handleModalCalenderUpdate, 
    handleAllTaskCompleteButton,
    handleAllTaskDeleteButton,
    handleCloudScene,
    start,
    addRightTop,
  }
})();