import { generateCrud } from './utils';

const serviceKey = 'faultTree';

const crud = generateCrud(serviceKey);

export const faultTreeService = {
  ...crud,
};
