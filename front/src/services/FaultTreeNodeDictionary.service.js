import { generateCrud } from './utils';

/**
 * Сервис словарь элементов дерева отказов
 */

const serviceKey = 'faultTreeNodeDictionary';

const crud = generateCrud(serviceKey, 'faultTreeNodeDictionaryId');

export const faultTreeNodeDictionaryService = {
  ...crud,
};
