import { generateCrud } from './utils';

const serviceKey = 'faultScenarioNodes';

const crud = generateCrud(serviceKey, 'faultScenarioNodeId');

const getByScenarioId = (scenarioId) => {
  return crud.state.value.filter((el) => el.faultScenarioId === scenarioId);
};

const getByFaultTreeNodeId = (faultTreeNodeId, faultScenarioId) => {
  return crud.state.value.find(
    (el) => el.faultTreeNodeId === faultTreeNodeId && el.faultScenarioId === faultScenarioId
  );
};

export const faultScenarioNodesService = {
  ...crud,
  getByScenarioId,
  getByFaultTreeNodeId,
};
