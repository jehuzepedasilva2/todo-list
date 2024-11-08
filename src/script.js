import handleEvents from "./handleEvents.js";
import "./styles.css";

function main() {
  handleEvents.start();
}

main();

// issue when adding new todos, must ensure that I stay in the same tab I was originally in, (i.e. today, all task, projects..)
//      - handleSaveModal, handleDeleteTodos
// in changeDOM.js, when switching between tabs and changing .right-content layout, I have find a better way to do so