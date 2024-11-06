import cachedDOM from "./cachedDOM.js";
import handleEvents from "./handleEvents.js";

function displayTodayTodos(user) {
  let todos = user.todos;
  const rightContent = cachedDOM.cachedRightContent;
  rightContent.innerHTML = ``;

  for (let i = 0; i < todos.length; i++) {
    const todoObj = todos[i];
    const card = document.createElement("div");
    card.classList.add(`todo-card`, `${todoObj.priority}`, `todo-card-${i}`);
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

    const checkbox = card.querySelector(`#check-${i}`);
    const deleteButton = card.querySelector(`.delete-todo-${i}`);   
    deleteButton.style.visibility = "hidden"; 
    deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(todos, i, user));
    checkbox.addEventListener("change", () => handleEvents.handleCheckbox(deleteButton, card, todoObj, checkbox));     
    rightContent.appendChild(card);
  }
}

export { displayTodayTodos };