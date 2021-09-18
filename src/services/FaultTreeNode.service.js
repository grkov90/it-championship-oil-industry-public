import { generateCrud } from './utils';

const serviceKey = 'faultTreeNode';

const crud = generateCrud(serviceKey);

export const getByFaultTreeId = (faultTreeId) => {
  return crud.state.value.filter((el) => el.faultTreeId === faultTreeId);
};

export const faultTreeNodeService = {
  ...crud,
  getByFaultTreeId,
};
