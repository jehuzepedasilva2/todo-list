import { addRightTop } from "./changeDOM.js";
import { createUser, loadUser } from "./createUser.js";
import handleLeftButton from "./handleLeftButtons.js";
import Todos from "./todos.js";
import cachedDOM from "./cachedDOM";
import { addProjName, addTodosProj } from "./projects.js";
import { saveUser, updateTheme } from "./saveUser.js";

const colors = Array.from({ length: 10 }, () => {
  const r = Math.floor(180 + Math.random() * 60); // Red: 180-240
  const g = Math.floor(180 + Math.random() * 60); // Green: 180-240
  const b = Math.floor(180 + Math.random() * 60); // Blue: 180-240
  return `rgb(${r}, ${g}, ${b})`;
});

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
  '--text-color-modal': '#000000',
  '--high-priority-border-color': '#EF4444',
  '--medium-priority-border-color': '#F59E0B',
  '--low-priority-border-color': '#34D399',
  '--crossed-out-text': '#9CA3AF7d',
  '--box-shadow-cards-01': 'rgba(0, 0, 0, 0.1)',
  '--box-shadow-cards-02': 'rgba(0, 0, 0, 0.2)',
  '--completed-all-todo-bg': 'rgba(34, 197, 94, 0.1)',
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
  '--modal-bg-color': '#6b7280',
  '--text-color-modal': '#000000',
  '--box-shadow-cards-01': 'rgba(0, 0, 0, 0.3)',
  '--box-shadow-cards-02': 'rgba(0, 0, 0, 0.5)',
  '--completed-all-todo-bg': 'rgba(0, 128, 0, 0.1)',
};

function intToTheme(x) {
  if (x === 0) {
    return darkTheme;
  }
  return lightTheme;
}

function start() {
  const leftButtons = cachedDOM.cachedLeftButtons;

  let {theme, userObj} = loadUser();

  // theme = 1;
  // userObj = createUser();

  saveUser(userObj);

  leftButtons.forEach(btn => {
    btn.addEventListener("click", () => handleLeftButton(userObj, btn, leftButtons));
  });

  handleLeftButton(userObj, leftButtons[0], leftButtons); // start off at today
  placeMoonOrSun(theme);

  applyTheme(theme, intToTheme(theme));
  modalCalendarUpdate();
  handleAddTodos(userObj);
  handleAddProject(userObj);
}

function placeMoonOrSun(x) {
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  if (x === 1) {
    moon.classList.remove("vis");
    sun.classList.add("vis");
  } else {
    sun.classList.remove("vis");
    moon.classList.add("vis");
  }
}

function applyTheme(x, theme=lightTheme) {
  const root = document.documentElement;
  Object.keys(theme).forEach(property => {
    root.style.setProperty(property, theme[property]);
  });
  updateTheme().saveAndSetTheme(x);
}

function handleCloudScene() {
  const cloudScene = document.querySelector(".clouds")
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  cloudScene.addEventListener("click", () => {
    if (sun.classList.contains("vis")) {
      sun.classList.remove("vis");
      moon.classList.add("vis");
      applyTheme(0, darkTheme);
    } else {
      moon.classList.remove("vis");
      sun.classList.add("vis");
      applyTheme(1, lightTheme);
    }
  })
}

function crossOutTodo(todoObj, middle, isRerender) {
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

function undoCrossOutTodo(todoObj, middle) {
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

function handleDeleteProjButton(user, btn, projName) {
   const delBtn = btn.querySelector(".delete-proj-btn");
   delBtn.addEventListener("click", () => {
    const leftContentThree = cachedDOM.cachedLeftContentThree;
    leftContentThree.removeChild(btn);
    delete user.projects[projName];
    const allProjBtn = document.querySelector(".all-projects");
    handleLeftButton(user, allProjBtn, "");
   })
}

function clearProjModal(modal) {
  const inputArea = modal.querySelector("#proj-name");
  if (inputArea) inputArea.value = "";
  modal.style.display = 'none';
}

function getColorForTabs(projName, userObj, c) {
  if (c === "") {
    userObj.projects[projName].c = colors[Math.floor(Math.random() * colors.length)];
    saveUser(userObj);
    return userObj.projects[projName].c;
  } 
  return c;
}

function addButtonToLeftContentThree(btnName,  unsanitizedBtnName, user, c="") {
  const leftContentThree = cachedDOM.cachedLeftContentThree;
  const newBtn = document.createElement("button");

  const color = getColorForTabs(btnName, user, c);

  newBtn.setAttribute("data-initial-color", `${color}`);

  newBtn.style.cssText = `display: flex; justify-content: space-between; align-items:center; background-color: ${color};`;
  
  newBtn.innerHTML = `
  ${unsanitizedBtnName}
  <svg class="delete-proj-btn" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF" onclick="event.stopPropagation()">
    <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
  </svg>
`;

  
  newBtn.classList.add(`${btnName}-button`, "user-added", "static");
  leftContentThree.appendChild(newBtn);

  newBtn.addEventListener("click", () => {
    handleLeftButton(user, newBtn, "");
  });

  handleDeleteProjButton(user, newBtn, btnName);
  const allProjBtn = document.querySelector(".all-projects");
  handleLeftButton(user, allProjBtn, ""); // reset to all projects button when a new project file is added;
}


function handleSaveProjModal(userObj, modal) {
  const inputValue = modal.querySelector("#proj-name").value;
  const sanitizedProjName = inputValue.replace(/[^a-zA-Z0-9-_]/g, '');

  addProjName(userObj, sanitizedProjName);

  addButtonToLeftContentThree(sanitizedProjName, inputValue, userObj);
  clearProjModal(modal);

}

function handleAddProject(userObj) {
  const modal = cachedDOM.cachedProjectModal;
  const openModalBtn = cachedDOM.cachedAddProjectButton;
  const closeModalBtn = document.querySelector(".close-proj");
  const saveButton = cachedDOM.cachedModalProjSaveButton;

  saveButton.addEventListener("click", () => handleSaveProjModal(userObj, modal));

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  closeModalBtn.onclick = function() {
    clearProjModal(modal);
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      clearProjModal(modal)
      modal.style.display = "none";
    }
  }
}


function chooseTab(user) {
  const origin = document.querySelector(".new-style");
  handleLeftButton(user, origin, "");
}

function handleDeleteTodos(todos, i, userObj) {
  todos.splice(i, 1);
  saveUser(userObj);
  chooseTab(userObj);
}

function handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle, isReRender=false) {
  deleteButton.style.cssText = "appearance: none; background: none; border: none;";
  if (checkbox.checked) {
    deleteButton.style.visibility = "visible";
    todoObj.isComplete = true;
    crossOutTodo(todoObj, middle, isReRender);
  } else {
    deleteButton.style.visibility = "hidden";
    undoCrossOutTodo(todoObj, middle);
    todoObj.isComplete = false;
  }

  saveUser(userObj);
}

function modalCalendarUpdate() {
  const modal = cachedDOM.cachedTodoModal;
  const dateArea = modal.querySelector('#task-date');
  const todaysDate = new Date();
  dateArea.setAttribute("value", `${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`);
  dateArea.setAttribute("min", `${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`);
}

function clearTodoModal(modal) {
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

function handleSaveTodoModal(userObj, modal) {
  const inputAreaValue = modal.querySelector('#task-name').value;
  const textAreaValue = modal.querySelector('#task-description').value;
  const dateArea = modal.querySelector('#task-date').value;
  const prioritySelectValue = modal.querySelector('#priority-select').value;
  const [year, month, date] = dateArea.split("-");
  Todos.addTodo(userObj, inputAreaValue, textAreaValue, new Date(year, month-1, date), prioritySelectValue);
  chooseTab(userObj);
  clearTodoModal(modal);
}

function handleSaveTodoProjModal(userObj, modal, originTab) {
  const inputAreaValue = modal.querySelector('#task-name').value;
  const textAreaValue = modal.querySelector('#task-description').value;
  const dateArea = modal.querySelector('#task-date').value;
  const prioritySelectValue = modal.querySelector('#priority-select').value;
  const [year, month, date] = dateArea.split("-");

  const projName = originTab.split("-")[0];
  addTodosProj(userObj, projName, inputAreaValue, textAreaValue,  new Date(year, month-1, date), prioritySelectValue);

  chooseTab(userObj);
  clearTodoModal(modal);
}

function handleSaveModal(userObj, modal) {
  const origin = document.querySelector(".new-style");
  const originTab = origin.classList[0];
  if (originTab === "today" || originTab === "all-tasks") {
    handleSaveTodoModal(userObj, modal, originTab);
  } else {
    handleSaveTodoProjModal(userObj, modal, originTab);
  }
}

// get the tab we are being called from
function handleAddTodos(userObj) {
  const modal = cachedDOM.cachedTodoModal;
  const openModalBtn = cachedDOM.cachedAddTodoButton;
  const closeModalBtn = document.querySelector(".close-todo");
  const saveButton = cachedDOM.cachedModalTodoSaveButton;

  saveButton.addEventListener("click", () => handleSaveModal(userObj, modal));

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  closeModalBtn.onclick = function() {
    clearTodoModal(modal);
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      clearTodoModal(modal)
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
    handleAddTodos,
    modalCalendarUpdate, 
    handleAllTaskCompleteButton,
    handleAllTaskDeleteButton,
    handleCloudScene,
    start,
    addRightTop,
    handleAddProject,
    addButtonToLeftContentThree,
  }
})();