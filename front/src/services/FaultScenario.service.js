import { generateCrud } from './utils';

const serviceKey = 'faultScenario';

const crud = generateCrud(serviceKey);

export const faultScenarioService = {
  ...crud,
};
