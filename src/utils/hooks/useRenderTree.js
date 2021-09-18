import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { TreeController } from '../tree/render';

export const useRenderTree = ({
  treeId,
  scenarioId,
  editMode,
  onClickScenarioNode,
  onDeleteNode,
}) => {
  const [divId, setDivId] = useState(uuidv4());
  const [treeController, setTreeController] = useState(null);
  useEffect(() => {
    if (treeId) {
      const newDivId = uuidv4();
      setDivId(newDivId);
      setTimeout(() => {
        const treeController = new TreeController({
          divId: newDivId,
          onClickScenarioNode,
          onDeleteNode,
        });
        treeController.renderTree(treeId, scenarioId, editMode);
        setTreeController(treeController);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, scenarioId, treeId]);

  return { divId, treeController };
};
