function getThemeFromStorage() {
  const theme = localStorage.getItem("theme");
  return parseInt(theme);
}

function getUserFromStorage() {
  const userJSON = localStorage.getItem("user");
  if (userJSON === null) {
  return false
  }

  // convert dates to Date() object;
  const userObj = JSON.parse(userJSON, (key, value) => {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
        return new Date(value);
    }
    return value;
  });

  return userObj
}

export { getThemeFromStorage, getUserFromStorage };