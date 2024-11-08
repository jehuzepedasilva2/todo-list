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

function getModal() {
  return document.getElementById("my-modal");
}

function getModalSaveButton() {
  return document.getElementById("save-task-btn");
}

function getAddProjectButton() {
  return document.querySelector(".add-project");
}

function getLeftContentThree() {
  return document.querySelector(".left-content-three");
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
    cachedModal: getModal(), 
    cachedModalSaveButton: getModalSaveButton(),
    cachedAddProjectButton: getAddProjectButton(),
    cachedLeftContentThree: getLeftContentThree(),
  };
})();