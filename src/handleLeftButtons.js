import CachedDOM from "./cachedDOM.js";
import { displayAllTodos, displayTodayTodos, displayAllProjects } from "./changeDOM.js";
import { convertDateToReadable, getDayFromIndex } from "./dateManipulation.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
  });
}

function removeRightTop() {
  const rightTop = CachedDOM.cachedRightTop;
  rightTop.innerHTML = "";
}

function addRightTop() {
  removeRightTop();
  const rightTop = CachedDOM.cachedRightTop;
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
        <div class="sun vis">
          <div class="sun-inner-01">
            <div class="sun-inner-02">
              <div class="sun-inner-03"></div>
            </div>
          </div>
        </div>
        <div class="moon">
          <div class="moon-inner-01">
            <div class="moon-inner-02">
              <div class="crater-01"></div>
              <div class="crater-02"></div>
              <div class="crater-03"></div>
            </div>
          </div>
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
    </div>
    `;
}

function display(user, btn) {
  if (btn.classList[0] === "today") {
    displayTodayTodos(user);
  } else if (btn.classList[0] === "all-tasks") {
    displayAllTodos(user);
  } else {
    displayAllProjects(user);
  }
}

export default function handleLeftButton(user, btn, leftButtons) {
  if (btn.classList.contains("add-project")) {
    return;
  }
  removeButtonLook(leftButtons);    
  display(user, btn);   
  btn.classList.add("new-style"); 
  addRightTop(); 
}