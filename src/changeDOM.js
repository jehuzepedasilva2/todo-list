import cachedDOM from "./cachedDOM.js";
import handleEvents from "./handleEvents.js";

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

// oldest to newest
function sortUserTodosByDate(user) {
  user.todos.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

function isToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0); // Remove time from each date in the list
  return checkDate.getTime() === today.getTime(); // Compare dates without time
}

function displayTodayTodos(user) {
  sortUserTodosByDate(user);
  let todos = user.todos;
  const rightContent = cachedDOM.cachedRightContent;
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
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
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
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
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
  rightContent.innerHTML = ``;

  for (let i = 0; i < todos.length; i++) {
    const todoObj = todos[i];
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
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
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
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
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

function displayAllProjects(userObj) {
  console.log("not implemented yet!")
}

export { displayTodayTodos, displayAllTodos, displayAllProjects };