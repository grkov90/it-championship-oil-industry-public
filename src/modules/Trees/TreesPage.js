import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Row } from 'antd';
import { makeId } from 'utils/helpers/random';
import { AsideMenu } from '../../components/AsideMenu';
import styles from './Trees.module.css';
import { TreeController } from '../../utils/tree/render';
import { faultTreeNodeDictionaryService } from '../../services/FaultTreeNodeDictionary.service';
import { faultTreeService } from '../../services/FaultTree.service';

export const TreesPage = () => {
  const [divId, setDivId] = useState(uuidv4());

  const [activeTree, setActiveTree] = useState(null);

  const [faultTreeNodeDictionary, setFaultTreeNodeDictionary] = useState([]);

  const [trees, setTrees] = useState([]);

  const fetchTrees = () => {
    setTrees(faultTreeService.getAll());
  };

  useEffect(() => {
    fetchTrees();
    setFaultTreeNodeDictionary(faultTreeNodeDictionaryService.getAll());
  }, []);

  const handleAddTree = () => {
    faultTreeService.create({ name: `Дерево ${makeId()}` });
    fetchTrees();
  };

  useEffect(() => {
    if (activeTree) {
      const newDivId = uuidv4();
      setDivId(newDivId);
      setTimeout(() => {
        const treeController = new TreeController(newDivId);
        treeController.renderTree(activeTree.id, undefined, true);
      });
    }
  }, [activeTree]);

  return (
    <Row align="bottom" gutter={8}>
      <Col span={4}>
        <AsideMenu
          items={trees}
          onSelectItem={(val) => setActiveTree(val)}
          Header={
            <Button block type="primary" ghost onClick={handleAddTree}>
              Добавить дерево
            </Button>
          }
        />
      </Col>
      <Col span={4}>
        <AsideMenu items={faultTreeNodeDictionary} />
      </Col>
      <Col span={16}>
        <div key={divId} id={divId} className={styles.TreeContent} />
      </Col>
    </Row>
  );
};
