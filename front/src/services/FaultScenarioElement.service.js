import { generateCrud } from './utils';

const serviceKey = 'faultScenarioElement';

const crud = generateCrud(serviceKey);

const getByScenarioId = (scenarioId) => {
  return crud.state.value.filter((el) => el.scenarioId === scenarioId);
};

const getByFaultTreeNodeId = (faultTreeNodeId, scenarioId) => {
  return crud.state.value.find(
    (el) => el.faultTreeNodeId === faultTreeNodeId && el.scenarioId === scenarioId
  );
};

export const faultScenarioElementService = {
  ...crud,
  getByScenarioId,
  getByFaultTreeNodeId,
};
