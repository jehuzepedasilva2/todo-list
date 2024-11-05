function convertNumToWeekday(num) {
  const conv = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday", 
    4: "Thursday", 
    5: "Friday", 
    6: "Saturday",
    7: "Sunday"
  };
  return conv[num].substring(0, 3);
}

function convertNumToMonth(num) {
  const conv = {
    0: "January", 
    1: "February", 
    2: "March", 
    3: "April", 
    4: "May", 
    5: "June", 
    6: "July", 
    7: "August", 
    8: "September", 
    9: "October", 
    10: "November", 
    11: "December",
  }
  return conv[num].substring(0, 3);
}

function dateToString(date) {
  return `${convertNumToWeekday(date.getDay())} ${date.getDate()} ${convertNumToMonth(date.getMonth())} ${date.getFullYear()}`;
}

export default function dateToObj(date) {
  const stringedDate = dateToString(date);
  const splitDate = stringedDate.split(' ');
  return {
    dayOfWeek: splitDate[0], 
    day: splitDate[1],
    month: splitDate[2],
    year: splitDate[3],
  }
}