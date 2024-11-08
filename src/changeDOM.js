import cachedDOM from "./cachedDOM.js";
import handleEvents from "./handleEvents.js";
import { convertDateToReadable, sortUserTodosByDate, isToday } from "./dateManipulation.js";

function displayTodayTodos(user) {
  sortUserTodosByDate(user);
  let todos = user.todos;
  const rightContent = cachedDOM.cachedRightContent;
  if (rightContent.classList.contains("all")) {
    rightContent.classList.remove("all");
  }
  rightContent.classList.add("daily")
  rightContent.innerHTML = ``;

  for (let i = 0; i < todos.length; i++) {
    const todoObj = todos[i];
    if (!isToday(todoObj.dueDate)) {
      continue;
    }
    const card = document.createElement("div");
    card.classList.add(`todo-card`, `${todoObj.priority}`, `todo-card-${i}`);
    let deleteButton, checkbox;
    if (!todos[i].isComplete) {
      card.innerHTML = `
      <div class="todo-card-left">
        <form>
          <input type="checkbox" class="check-box" id="check-${i}" name="is_completed">
        </form>
      </div>
      <div class="todo-card-middle">
        <h2>${todoObj.title}</h2>
        <h4>${todoObj.description}</h4>
      </div>
      <div class="todo-card-right">
        <button class="delete-todo-${i}">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
          </svg>
        </button>
      </div>
      `;
      checkbox = card.querySelector(`#check-${i}`);
      deleteButton = card.querySelector(`.delete-todo-${i}`);   
      deleteButton.style.visibility = "hidden"; 
    } else {
      card.innerHTML = `
      <div class="todo-card-left">
        <form>
          <input type="checkbox" class="check-box" id="check-${i}" name="is_completed">
        </form>
      </div>
      <div class="todo-card-middle cross-out-active">
        <h2 class="crossed-out">${todoObj.title}</h2>
      </div>
      <div class="todo-card-right">
        <button class="delete-todo-${i}">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
          </svg>
        </button>
      </div>
      `;
      checkbox = card.querySelector(`#check-${i}`);
      deleteButton = card.querySelector(`.delete-todo-${i}`);   
      checkbox.checked = true;
      handleEvents.handleCheckbox(deleteButton, card, todoObj, checkbox, true);
    }

    deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(todos, i, user));
    checkbox.addEventListener("change", () => handleEvents.handleCheckbox(deleteButton, card, todoObj, checkbox));     
    rightContent.appendChild(card);
  }
}

// gonna be a little different okay for now
function displayAllTodos(user) {
  sortUserTodosByDate(user);
  let todos = user.todos;
  const rightContent = cachedDOM.cachedRightContent;
  if (rightContent.classList.contains("daily")) {
    rightContent.classList.remove("daily");
  }
  rightContent.classList.add("all")
  rightContent.innerHTML = ``;

  for (let i = 0; i < todos.length; i++) {
    const todoObj = todos[i];
    const card = document.createElement("div");
    card.classList.add(`all-todo-card`, `all-todo-card-${i}`);
    card.innerHTML = `
      <div class="all-todo-card-top">
        <div class="all-todo-date ${todoObj.priority}">
          <h2>${convertDateToReadable(todoObj.dueDate)}</h2>
        </div>
        <div class="all-todo-title">
          <h2>${todoObj.title}</h2>
        </div>
      </div>
      <div class="all-todo-card-middle">
        <div class="all-todo-desc">
          <h4>${todoObj.description}</h4>
        </div>
      </div>
      <div class="all-todo-bottom">
        <button id="all-todo-complete-${i}">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px">
            <path d="M480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/>
          </svg>
        </button>
        <button id="all-todo-delete-${i}">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px">
            <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
          </svg>
        </button>
      </div>
    `;
    rightContent.appendChild(card);
    const completeButton = document.getElementById(`all-todo-complete-${i}`);
    completeButton.addEventListener("click", () => handleEvents.handleAllTaskCompleteButton(todoObj, completeButton, card))
    const deleteButton = document.getElementById(`all-todo-delete-${i}`);  
    deleteButton.addEventListener("click", () => handleEvents.handleAllTaskDeleteButton(todos, i, user));
    if (todoObj.isComplete) {
      handleEvents.handleAllTaskCompleteButton(todoObj, completeButton, card);
    }
  }
}

function displayAllProjects(userObj) {
  const rightContent = cachedDOM.cachedRightContent;
  rightContent.innerHTML = "";
  console.log("not implemented yet!")
}

export { displayTodayTodos, displayAllTodos, displayAllProjects };