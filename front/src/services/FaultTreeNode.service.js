import { generateCrud } from './utils';

/**
 * Сервис элементов сценариев отказа
 */

const serviceKey = 'faultTreeNodes';

const crud = generateCrud(serviceKey, 'faultTreeNodeId');

export const getByFaultTreeId = (faultTreeId) => {
  return crud.state.value.filter((el) => el.faultTreeId === faultTreeId);
};

export const faultTreeNodeService = {
  ...crud,
  getByFaultTreeId,
};
