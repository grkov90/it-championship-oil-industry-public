import { generateCrud } from './utils';

const serviceKey = 'faultTreeNodeDictionary';

const crud = generateCrud(serviceKey);

export const faultTreeNodeDictionaryService = {
  ...crud,
};
