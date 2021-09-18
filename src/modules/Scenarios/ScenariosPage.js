import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { ScenariosAsideMenu } from './ScenariosAsideMenu';
import styles from './Scenarios.module.css';
import { TreeController } from '../../utils/tree/render';

export const ScenariosPage = () => {
  const items = [
    { title: 'Дерево 1', scenarios: [{ title: 'scenario 1' }, { title: 'scenario 2' }] },
    { title: 'Дерево 2', scenarios: [{ title: 'scenario 3' }, { title: 'scenario 4' }] },
  ];
  const divId = 'fault-tree';

  useEffect(() => {
    const treeId = 1;
    const scenarioId = 1;
    const editMode = false;
    const treeController = new TreeController(divId);
    treeController.renderTree(treeId, scenarioId, editMode);
  }, []);
  return (
    <Row gutter={8}>
      <Col span={4}>
        <ScenariosAsideMenu items={items} />
      </Col>
      <Col span={20}>
        <div id={divId} className={styles.ScenarioContent} />
      </Col>
    </Row>
  );
};
