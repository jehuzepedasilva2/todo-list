function convertDateToReadable(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDayFromIndex(index) {
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return days[index];
}

function sortUserTodosByDate(user) {
  user.todos.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

function isToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0); // Remove time from each date in the list
  return checkDate.getTime() === today.getTime(); // Compare dates without time
}

export { convertDateToReadable, getDayFromIndex, sortUserTodosByDate, isToday };
