const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const localService = {
  setItem,
  getItem,
};
