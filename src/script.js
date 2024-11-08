import handleEvents from "./handleEvents.js";
import "./styles.css";

function main() {
  handleEvents.start();
}

main();

// in changeDOM.js, when switching between tabs and changing .right-content layout, I have find a better way to do so