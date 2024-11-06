import CachedDOM from "./cachedDOM.js";
import handleLeftButton from "./handleLeftButtons.js";
import CreateUser from "./createUser.js";
import { displayTodayTodos } from "./changeDOM.js";
import handleEvents from "./handleEvents.js";
import "./styles.css";

function main() {
  const leftButtons = CachedDOM.cachedLeftButtons;
  const userObj = CreateUser();
  leftButtons.forEach(btn => {
    btn.addEventListener("click", () => handleLeftButton(userObj, btn, leftButtons));
  });
  handleLeftButton(userObj, leftButtons[0], leftButtons); // start off at today
  handleEvents.handleModalCalenderUpdate();
  handleEvents.handleAddTodosModal(userObj);
}

main();

// issue when adding new todos, must ensure that I stay in the same tab I was originally in, (i.e. today, all task, projects..)
//      - handleSaveModal, handleDeleteTodos