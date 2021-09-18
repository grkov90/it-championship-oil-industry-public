import { makeId } from 'utils/helpers/random';
import { localService } from './local.service';

export const generateCrud = (serviceKey) => {
  let state;

  const updateState = () => {
    state = localService.getItem(serviceKey) || [];
  };

  updateState();

  const getAll = () => {
    return state;
  };

  const create = (item) => {
    const newValue = [{ ...item, id: makeId() }, ...state];
    localService.setItem(serviceKey, newValue);
    updateState();
  };

  const update = (item) => {
    const newValue = state.map((el) => {
      if (el.id === item.id) {
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
    const newValue = state.filter((el) => el.id !== id);
    localService.setItem(serviceKey, newValue);
    updateState();
  };

  const getById = (id) => {
    return state.find((el) => el.id === id);
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
