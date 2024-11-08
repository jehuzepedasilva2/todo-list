function getBody() {
  return document.querySelector("body");
}

function getLeftButtons() {
  return document.querySelectorAll(".left button");
}

function getLeftContent() {
  return {
    buttonsTop: document.querySelector(".left-content-one"),
    buttonsBottom: document.querySelector(".left-content-three")
  };
}

function getRightTop() {
  return document.querySelector(".right-top");
}

function getRightContent() {
  return document.querySelector(".right-content");
}

function getAddTodoButton() {
  return document.querySelector(".add-todo");
}

function getTodoCards() {
  return document.querySelectorAll(".todo-card");
}

function getAddTodoModal() {
  return document.getElementById("add-todo-modal");
}

function getModalTodoSaveButton() {
  return document.getElementById("save-task-btn");
}

function getModalProjSaveButton() {
  return document.getElementById("save-proj-btn");
}

function getAddProjectButton() {
  return document.querySelector(".add-project");
}

function getLeftContentThree() {
  return document.querySelector(".left-content-three");
}

function getAddProjectModal() {
  return document.getElementById("add-project-modal");
}

export default (function getDOM() {
  return {
    cachedBody: getBody(), 
    cachedLeftButtons: getLeftButtons(),
    cachedLeftContent: getLeftContent(),
    cachedRightTop: getRightTop(),
    cachedRightContent: getRightContent(),
    cachedAddTodoButton: getAddTodoButton(),
    cachedTodoCards: getTodoCards(),
    cachedTodoModal: getAddTodoModal(), 
    cachedModalTodoSaveButton: getModalTodoSaveButton(),
    cachedAddProjectButton: getAddProjectButton(),
    cachedLeftContentThree: getLeftContentThree(),
    cachedProjectModal: getAddProjectModal(),
    cachedModalProjSaveButton: getModalProjSaveButton(),
  };
})();