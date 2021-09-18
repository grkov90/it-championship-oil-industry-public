import { generateCrud } from './utils';

const serviceKey = 'faultScenarioElement';

const crud = generateCrud(serviceKey);

const getByScenarioId = (scenarioId) => {
  return crud.state.filter((el) => el.scenarioId === scenarioId);
};

export const faultScenarioElementService = {
  ...crud,
  getByScenarioId,
};
