import { generateCrud } from './utils';

const serviceKey = 'faultTreeNodeDictionary';

const crud = generateCrud(serviceKey, 'faultTreeNodeDictionaryId');

export const faultTreeNodeDictionaryService = {
  ...crud,
};
