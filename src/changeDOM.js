import cachedDOM from "./cachedDOM.js";
import handleEvents from "./handleEvents.js";
import { convertDateToReadable, sortUserTodosByDate, isToday, getDayFromIndex } from "./dateManipulation.js";
import { saveUser } from "./saveUser.js";

function thereAreProjects(projects) {
  if (Object.keys(projects).length === 0) {
    return false
  }
  return true
}

function addRightTop() {
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  let sunClasses = `sun vis`;
  let moonClasses = "moon";
  if (sun && moon) {
    sunClasses = sun.classList.toString();
    moonClasses = moon.classList.toString();
  }
  const rightTop = cachedDOM.cachedRightTop;
  const todaysDate = new Date();
  const dayOfWeek = getDayFromIndex(todaysDate.getDay());
  const [month, day, year] = convertDateToReadable(todaysDate).replace(",", "").split(" ");
  rightTop.innerHTML = `
  <div class="clouds-container">
    <div class="clouds">
      <div class="cloud-container-one">
        <div class="circle" id="circle-01"></div>
        <div class="circle" id="circle-02"></div>
      </div>
      <div class="cloud-container-two">
        <div class="circle" id="circle-03"></div>
        <div class="circle" id="circle-04"></div>
      </div>
      <div class="cloud-container-three">
        <div class="circle" id="circle-05"></div>
        <div class="circle" id="circle-06"></div>
      </div>
      <div class="${sunClasses}">
        <div class="sun-inner-01">
          <div class="sun-inner-02">
            <div class="sun-inner-03"></div>
          </div>
        </div>
      </div>
      <div class="${moonClasses}">
        <div class="moon-inner-01">
          <div class="moon-inner-02">
            <div class="crater-01"></div>
            <div class="crater-02"></div>
            <div class="crater-03"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bird-container">
    <div class="bird-01">
      <div class="left-wing"></div>
      <div class="right-wing"></div>
    </div>
    <div class="bird-02">
      <div class="left-wing"></div>
      <div class="right-wing"></div>
    </div>
    <div class="bird-03">
      <div class="left-wing"></div>
      <div class="right-wing"></div>
    </div>
  </div>

  </div>
  <div class="right-top-header">
    <div class="header-top">
      <h1>${dayOfWeek}</h1>
    </div>
    <div class="header-bottom">
      <h3>${month} ${day}, ${year}</h3>
    </div>
  </div>`;
  handleEvents.handleCloudScene();
}

function updateRightContentClasses(rightContent, classToAdd) {
  const classes = rightContent.classList;
  classes.forEach(c => {
    if (c !== "right-content") {
      rightContent.classList.remove(c);
    }
  })
  rightContent.classList.add(classToAdd);
}

function displayTodayTodos(userObj) {

  sortUserTodosByDate(userObj);
  saveUser(userObj);

  let todos = userObj.todos;
  const rightContent = cachedDOM.cachedRightContent;
  updateRightContentClasses(rightContent, "daily")
  rightContent.innerHTML = ``;

  for (let i = 0; i < todos.length; i++) {
    const todoObj = todos[i];
    if (!isToday(todoObj.dueDate)) {
      continue;
    }
    const card = document.createElement("div");
    card.classList.add(`todo-card`, `${todoObj.priority}`, `todo-card-${i}`);
    let deleteButton, checkbox, middle;
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
      middle = card.querySelector(".todo-card-middle");
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
      middle = card.querySelector(".todo-card-middle"); 
      checkbox.checked = true;
      handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle, true);
    }

    deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(todos, i, userObj));
    checkbox.addEventListener("change", () => handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle));     
    rightContent.appendChild(card);
  }
}

function displayAllTodos(userObj) {

  sortUserTodosByDate(userObj);
  saveUser(userObj);

  let todos = userObj.todos;
  const rightContent = cachedDOM.cachedRightContent;
  updateRightContentClasses(rightContent, "all");
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
    deleteButton.addEventListener("click", () => handleEvents.handleAllTaskDeleteButton(todos, i, userObj));
    if (todoObj.isComplete) {
      handleEvents.handleAllTaskCompleteButton(todoObj, completeButton, card);
    }
  }
}

function displayEmptyScreen(msg) {
  const rightContent = cachedDOM.cachedRightContent;
  updateRightContentClasses(rightContent, "no-projs");
  rightContent.innerHTML = `
    <div>
      <h1>${msg}</h1>
    </div>
  `;
}


// add functionaly to check off an item;
function displayAllProjects(userObj) {

  saveUser(userObj);

  const rightContent = cachedDOM.cachedRightContent;
  updateRightContentClasses(rightContent, "all-pro");

  rightContent.innerHTML = "";
  const projects = userObj.projects // this is an object

  if (!thereAreProjects(projects)) {
    displayEmptyScreen("Empty");
  }

  for (const projName in projects) {
    const projsTodoList = projects[projName].todos; // this is a list of objects
    const card = document.createElement("div");
    card.classList.add(`all-proj-card`, `all-proj-card-${projName}`);
    card.innerHTML = `
      <div class="all-proj-card-top">
        <h1>${projName}</h1>
      </div>`;

    sortUserTodosByDate(projects[projName]);

    for (let i = 0; i < projsTodoList.length; i++) {
      const todoObj = projsTodoList[i];
      const innerCard = document.createElement("div");
      innerCard.classList.add("proj-card", todoObj.priority);
      
      if (!todoObj.isComplete) {

        innerCard.innerHTML = `
          <div class="proj-card-left inner-all-projs">
            <form>
              <input type="checkbox" class="check-box" id="check-user-proj-${i}" name="is_completed_user_proj">
            </form>
          </div>
          <div class="proj-card-middle" id="proj-card-middle-${i}">
            <h2>${todoObj.title}</h2>
            <h4>${todoObj.description}</h4>
          </div>
          <div class="proj-card-right">
            <button class="delete-user-proj" data-index="${i}">
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
                <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
              </svg>
            </button>
          </div>`;
        card.appendChild(innerCard);
    
        const checkbox = innerCard.querySelector(`#check-user-proj-${i}`);
        const deleteButton = innerCard.querySelector(".delete-user-proj");
        const middle = innerCard.querySelector(`#proj-card-middle-${i}`);
        deleteButton.style.visibility = "hidden";
    
        deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(projsTodoList, i, userObj));
        checkbox.addEventListener("change", () => handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle));
    
      } else {

        innerCard.innerHTML = `
          <div class="proj-card-left inner-all-projs">
            <form>
              <input type="checkbox" class="check-box" id="check-user-proj-${i}" name="is_completed_user_proj">
            </form>
          </div>
          <div class="proj-card-middle crossed-out" id="proj-card-middle-${i}">
            <h2>${todoObj.title}</h2>
          </div>
          <div class="proj-card-right">
            <button class="delete-user-proj" data-index="${i}">
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
                <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
              </svg>
            </button>
          </div>`;
        card.appendChild(innerCard);
    
        const checkbox = innerCard.querySelector(`#check-user-proj-${i}`);
        const deleteButton = innerCard.querySelector(".delete-user-proj");
        const middle = innerCard.querySelector(`#proj-card-middle-${i}`);
        checkbox.checked = true;
        handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle, true);
    
        deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(projsTodoList, i, userObj));
        checkbox.addEventListener("change", () => handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle, true));

      }
    } 

    if (projsTodoList.length === 0) {
      const emptySign = document.createElement("div");
      emptySign.style.cssText = "text-align: center; color: #8381817d;"
      emptySign.innerHTML = `Empty <br> Click on <strong>${projName}</strong> to add tasks`;
      card.appendChild(emptySign)
    }

    rightContent.appendChild(card);
  }
}

function displayUserProjects(userObj, buttonName) {

  saveUser(userObj);

  const projName = buttonName.split("-")[0];
  const rightContent = cachedDOM.cachedRightContent;
  const projectTodos = userObj.projects[projName].todos;
  updateRightContentClasses(rightContent, "user-projects");
  rightContent.innerHTML = "";

  if (projectTodos.length === 0) {
    displayEmptyScreen("Empty");
  }

  sortUserTodosByDate(userObj.projects[projName]);

  for (let i = 0; i < projectTodos.length; i++) {
    const todoObj = projectTodos[i];
    const card = document.createElement("div");
    card.classList.add("outer-proj-card", `outer-proj-card-${i}`)

    const date = todoObj.dueDate;
    const dayOfWeek = getDayFromIndex(date.getDay());
    const [month, day, year] = convertDateToReadable(date).replace(",", "").split(" ");
    let deleteButton, checkbox, middle;

    if (!todoObj.isComplete) {

      card.innerHTML = `
      <div class="outer-date">
        <h3>${dayOfWeek.toUpperCase()}, ${month} ${day}, ${year}</h3>
      </div>
      <div class="proj-card ${todoObj.priority}">
        <div class="proj-card-left">
          <form>
            <input type="checkbox" class="check-box" id="check-user-proj-${i}" name="is_completed_user_proj">
          </form>
        </div>
        <div class="proj-card-middle">
          <h2>${todoObj.title}</h2>
          <h4>${todoObj.description}</h4>
        </div>
        <div class="proj-card-right">
          <button class="delete-user-proj-${i}">
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
            </svg>
          </button>
        </div>
      </div>
      `;

      checkbox = card.querySelector(`#check-user-proj-${i}`);
      deleteButton = card.querySelector(`.delete-user-proj-${i}`);   
      middle = card.querySelector(".proj-card-middle");
      deleteButton.style.visibility = "hidden"; 

    } else {

      card.innerHTML = `
      <div class="outer-date">
        <h3>${dayOfWeek.toUpperCase()}, ${month} ${day}, ${year}</h3>
      </div>
      <div class="proj-card ${todoObj.priority}">
        <div class="proj-card-left">
          <form>
            <input type="checkbox" class="check-box" id="check-user-proj-${i}" name="is_completed_user_proj">
          </form>
        </div>
        <div class="proj-card-middle">
          <h2>${todoObj.title}</h2>
        </div>
        <div class="proj-card-right">
          <button class="delete-user-proj-${i}">
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
            </svg>
          </button>
        </div>
      </div>
      `;

      checkbox = card.querySelector(`#check-user-proj-${i}`);
      deleteButton = card.querySelector(`.delete-user-proj-${i}`);  
      middle = card.querySelector(".proj-card-middle");  
      checkbox.checked = true;
      handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle, true);

   }
    deleteButton.addEventListener("click", () => handleEvents.handleDeleteTodos(projectTodos, i, userObj));
    checkbox.addEventListener("change", () => handleEvents.handleCheckbox(userObj, deleteButton, todoObj, checkbox, middle));     
    rightContent.appendChild(card);
  }
}

export { displayTodayTodos, displayAllTodos, displayAllProjects, addRightTop, displayUserProjects };

// still to do: 
// add functionality to the add-todo button the corner, so that when in a project tab the, todo gets added to that project!