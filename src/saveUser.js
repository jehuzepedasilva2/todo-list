function updateTheme() {
  let theme;

  function saveAndSetTheme(curr) {
    theme = curr;
    localStorage.setItem("theme", `${theme}`);
  }

  function getTheme() {
    return theme;
  }

  return { saveAndSetTheme, getTheme }
}

function saveUser(userObj) {
  const userJSON = JSON.stringify(userObj);
  localStorage.setItem("user", userJSON);
}

export { saveUser, updateTheme }