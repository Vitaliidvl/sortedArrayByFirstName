export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

const monthNames = [
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October"
];

export const firstNameSort = (a, b) => a.firstName.localeCompare(b.firstName);

export const getItemsFromLocalStorage = (key, defaultValue = {}) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
};

export const removeEmptyKeys = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key].length) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const sortByMonth = (obj) => {
  const november = 11;
  const employeeBirthMonth = Object.keys(obj).sort((a, b) => a - b);
  const prevMonths = employeeBirthMonth.filter((month) => +month < +november);
  const pastMonths = employeeBirthMonth.filter((month) => +month >= +november);

  const result = [...pastMonths, ...prevMonths].reduce((acc, item) => {
    const month = monthNames[item];
    acc[month] = obj[item] || [];
    return acc;
  }, {});
  return result;
};
