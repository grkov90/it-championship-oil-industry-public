import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { faultScenarioService } from 'services/FaultScenario.service';
import { faultTreeService } from 'services/FaultTree.service';
import { makeId } from 'utils/helpers/random';
import { useRenderTree } from 'utils/hooks/useRenderTree';
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
          newScenarioName={newScenarioName}
          setNewScenarioName={setNewScenarioName}
          onScenarioSelect={setActiveScenario}
          onScenarioAdd={handleAddScenario}
          items={items}
        />
      </Col>
      <Col span={20}>
        <div key={divId} id={divId} className={styles.ScenarioContent} />
      </Col>
    </Row>
  );
};
