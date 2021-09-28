import { generateCrud } from './utils';

const serviceKey = 'faultScenarios';

const crud = generateCrud(serviceKey, 'faultScenarioId');

export const faultScenarioService = {
  ...crud,
};
