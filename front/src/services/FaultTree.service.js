import { generateCrud } from './utils';

const serviceKey = 'faultTrees';

const crud = generateCrud(serviceKey, 'faultTreeId');

export const faultTreeService = {
  ...crud,
};
