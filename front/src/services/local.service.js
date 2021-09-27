import { saveTemplateAsFile } from '../utils/download/download';
import { resetData } from '../utils/tree/data';

const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const exportStore = () => {
  saveTemplateAsFile(`data ${new Date().toISOString()}.json`, localStorage);
};

const reset = () => {
  window.localStorage.clear();
  resetData();
};

resetData();

export const localService = {
  setItem,
  getItem,
  exportStore,
  reset,
};
