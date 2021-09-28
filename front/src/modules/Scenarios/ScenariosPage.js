import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { faultScenarioService } from 'services/FaultScenario.service';
import { faultTreeService } from 'services/FaultTree.service';
import { faultScenarioNodesService } from 'services/FaultScenarioNodesService';
import { makeId } from 'utils/helpers/random';
import { useRenderTree } from 'utils/hooks/useRenderTree';
import { faultTreeNodeService } from 'services/FaultTreeNode.service';
import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import styles from './Scenarios.module.css';
import { ScenariosAsideMenu } from './ScenariosAsideMenu';
import { ScenarioModal } from './ScenarioModal';
import { NodeType } from '../../utils/tree/node-types';

/**
 * Страница сценариев отказа
 */
export const ScenariosPage = () => {
  const [items, setItems] = useState([]);
  const [newScenarioName, setNewScenarioName] = useState('');
  const [isScenarioModalVisible, setIsScenarioModalVisible] = useState(false);
  const [diagramNode, setDiagramNode] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  const fetchData = () => {
    const scenarios = faultScenarioService.getAll();
    const trees = faultTreeService.getAll();
    setItems(
      trees.map((tree) => {
        return {
          ...tree,
          scenarios: scenarios.filter((scenario) => scenario.faultTreeId === tree.faultTreeId),
        };
      })
    );
  };

  const handleOpenScenarioModal = (node) => {
    setIsScenarioModalVisible(true);
    setDiagramNode(node);
  };

  const handleAddScenario = (treeId) => {
    const id = makeId();
    faultScenarioService.create({
      faultScenarioId: id,
      name: newScenarioName || `Сценарий ${id}`,
      faultTreeId: treeId,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { divId, treeController } = useRenderTree({
    scenarioId: activeScenario?.faultScenarioId,
    treeId: activeScenario?.faultTreeId,
    editMode: false,
    onClickScenarioNode: handleOpenScenarioModal,
  });

  const handleClearRto = () => {
    faultTreeNodeService.getByFaultTreeId(activeScenario?.faultTreeId).forEach((faultTreeNode) => {
      const scenarioNode = faultScenarioNodesService.getByFaultTreeNodeId(
        faultTreeNode.faultTreeNodeId,
        activeScenario.faultScenarioId
      );
      const faultTreeDictionaryNode = faultTreeNodeDictionaryService.getById(
        faultTreeNode.faultTreeNodeDictionaryId
      );
      if (faultTreeDictionaryNode.nodeType === NodeType.ItResource) {
        if (scenarioNode) {
          faultScenarioNodesService.update({ ...scenarioNode, scenario: { RTO: 0, RPO: 0 } });
        } else {
          faultScenarioNodesService.create({
            faultScenarioId: activeScenario.faultScenarioId,
            faultTreeNodeId: faultTreeNode.faultTreeNodeId,
            scenario: { RTO: 0, RPO: 0 },
          });
        }
      }
    });
    treeController.refreshDiagram();
  };

  return (
    <Row gutter={8}>
      <ScenarioModal
        diagramNode={diagramNode}
        scenarioId={activeScenario?.faultScenarioId}
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
