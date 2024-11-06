import CachedDOM from "./cachedDOM.js";
import handleLeftButton from "./handleLeftButtons.js";
import CreateUser from "./createUser.js";
import { displayTodayTodos } from "./changeDOM.js";
import handleEvents from "./handleEvents.js";
import "./styles.css";

function main() {
  const leftButtons = CachedDOM.cachedLeftButtons;
  leftButtons.forEach(btn => {
    btn.addEventListener("click", () => handleLeftButton(btn, leftButtons));
  });
  const userObj = CreateUser();
  displayTodayTodos(userObj); 
  handleLeftButton(leftButtons[0], leftButtons);
  handleEvents.handleAddTodosModal(); // need to add functionality
}

main();
