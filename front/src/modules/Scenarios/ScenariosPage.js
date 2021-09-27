import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { faultScenarioService } from 'services/FaultScenario.service';
import { faultTreeService } from 'services/FaultTree.service';
import { faultScenarioElementService } from 'services/FaultScenarioElement.service';
import { makeId } from 'utils/helpers/random';
import { useRenderTree } from 'utils/hooks/useRenderTree';
import { faultTreeNodeService } from 'services/FaultTreeNode.service';
import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { NodeType } from 'utils/tree/nodes';
import styles from './Scenarios.module.css';
import { ScenariosAsideMenu } from './ScenariosAsideMenu';
import { ScenarioModal } from './ScenarioModal';

export const ScenariosPage = () => {
  const [items, setItems] = useState([]);
  const [newScenarioName, setNewScenarioName] = useState('');
  const [isScenarioModalVisible, setIsScenarioModalVisible] = useState(false);
  const [faultTreeNode, setFaultTreeNode] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  const fetchData = () => {
    const scenarios = faultScenarioService.getAll();
    const trees = faultTreeService.getAll();
    setItems(
      trees.map((tree) => {
        return {
          ...tree,
          scenarios: scenarios.filter((scenario) => scenario.faultTreeId === tree.id),
        };
      })
    );
  };

  const handleOpenScenarioModal = (node) => {
    setIsScenarioModalVisible(true);
    setFaultTreeNode(node);
  };

  const handleAddScenario = (treeId) => {
    const id = makeId();
    faultScenarioService.create({
      id,
      name: newScenarioName || `Сценарий ${id}`,
      faultTreeId: treeId,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { divId, treeController } = useRenderTree({
    scenarioId: activeScenario?.id,
    treeId: activeScenario?.faultTreeId,
    editMode: false,
    onClickScenarioNode: handleOpenScenarioModal,
  });

  const handleClearRto = () => {
    faultTreeNodeService.getByFaultTreeId(activeScenario?.faultTreeId).forEach((faultTreeNode) => {
      const scenarioNode = faultScenarioElementService.getByFaultTreeNodeId(
        faultTreeNode.id,
        activeScenario.id
      );
      const faultTreeDictionaryNode = faultTreeNodeDictionaryService.getById(
        faultTreeNode.faultTreeNodeDictonaryId
      );
      if (faultTreeDictionaryNode.nodeType === NodeType.ItResource) {
        if (scenarioNode) {
          faultScenarioElementService.update({ ...scenarioNode, rtoTarget: 0 });
        } else {
          faultScenarioElementService.create({
            scenarioId: activeScenario.id,
            faultTreeNodeId: faultTreeNode.id,
            rtoTarget: 0,
          });
        }
      }
    });
    treeController.refreshDiagram();
  };

  return (
    <Row gutter={8}>
      <ScenarioModal
        node={faultTreeNode}
        setIsVisible={setIsScenarioModalVisible}
        isVisible={isScenarioModalVisible}
        treeController={treeController}
      />
      <Col span={4}>
        <ScenariosAsideMenu
          activeScenario={activeScenario}
          newScenarioName={newScenarioName}
          setNewScenarioName={setNewScenarioName}
          onScenarioSelect={setActiveScenario}
          onScenarioAdd={handleAddScenario}
          items={items}
          onClearRto={handleClearRto}
        />
      </Col>
      <Col span={20}>
        <div key={divId} id={divId} className={styles.ScenarioContent} />
      </Col>
    </Row>
  );
};
