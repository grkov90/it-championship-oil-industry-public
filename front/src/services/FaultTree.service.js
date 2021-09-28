import { generateCrud } from './utils';

/**
 * Сервис деревьев отказа
 */

const serviceKey = 'faultTrees';

const crud = generateCrud(serviceKey, 'faultTreeId');

export const faultTreeService = {
  ...crud,
};
