import { generateCrud } from './utils';

/**
 * Сервис сценариев отказа
 */

const serviceKey = 'faultScenarios';

const crud = generateCrud(serviceKey, 'faultScenarioId');

export const faultScenarioService = {
  ...crud,
};
