import { saveTemplateAsFile } from '../utils/download/download';
import initData from './data.json';

const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const exportStore = () => {
  const keys = [
    'faultTrees',
    'faultTreeNodes',
    'faultScenarios',
    'faultScenarioNodes',
    'faultTreeNodeDictionary',
  ];

  const dateStr = new Date().toISOString();
  saveTemplateAsFile(
    `data_${dateStr}.json`,
    keys.reduce(
      (acc, key) => {
        acc[key] = getItem(key);
        return acc;
      },
      {
        dataVersion: dateStr,
      }
    )
  );
};

export function reloadData(clear, newData) {
  const data = newData || initData;

  if (clear) {
    window.localStorage.clear();
  }

  if (!localStorage.getItem('dataVersion')) {
    Object.keys(data).forEach((key) => {
      setItem(key, data[key]);
    });
    window.location.reload();
  }
}

const reset = () => {
  reloadData(true);
};

reloadData();

export const localService = {
  setItem,
  getItem,
  exportStore,
  reset,
};
