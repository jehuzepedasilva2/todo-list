import CachedDOM from "./cachedDOM.js";

function removeButtonLook(leftButtons) {
  leftButtons.forEach(btn => {
    btn.classList.remove("new-style");
  });
}

function removeHeaderRightTop() {
  const rightTop = CachedDOM.cachedRightTop;
  rightTop.innerHTML = "";
}

function addDateRightTop() {
  removeHeaderRightTop();
  const rightTop = CachedDOM.cachedRightTop;
  const h1 = document.createElement("h1");
  const date = new Date().toDateString();
  h1.textContent = date
  rightTop.appendChild(h1);
}

export default function handleLeftButton(btn, leftButtons) {
  removeButtonLook(leftButtons);       
  btn.classList.add("new-style"); 
  addDateRightTop(); 
}