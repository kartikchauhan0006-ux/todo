export const saveLocal = (data) => {
  window.localStorage.setItem("react-todo", JSON.stringify(data));
};

export const loadLocal = () => {
  return JSON.parse(window.localStorage.getItem("react-todo"));
};
