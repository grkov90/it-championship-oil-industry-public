import { makeId } from 'utils/helpers/random';
import { BehaviorSubject } from 'rxjs';
import { localService } from './local.service';

export const generateCrud = (serviceKey, idKey) => {
  const state = new BehaviorSubject([]);

  const updateState = () => {
    state.next(localService.getItem(serviceKey) || []);
  };

  updateState();

  const getAll = () => {
    return state.value;
  };

  const create = (item) => {
    const newItem = { ...item, [idKey]: makeId() };
    const newValue = [newItem, ...state.value];
    localService.setItem(serviceKey, newValue);
    updateState();

    return newItem;
  };

  const update = (item) => {
    const newValue = state.value.map((el) => {
      if (el[idKey] === item[idKey]) {
        return {
          ...el,
          ...item,
        };
      }
      return el;
    });
    localService.setItem(serviceKey, newValue);
    updateState();
  };

  const remove = (id) => {
    const newValue = state.value.filter((el) => el[idKey] !== id);
    localService.setItem(serviceKey, newValue);
    updateState();
  };

  const getById = (id) => {
    return state.value.find((el) => el[idKey] === id);
  };

  return {
    updateState,
    getAll,
    create,
    update,
    remove,
    getById,
    state,
  };
};
