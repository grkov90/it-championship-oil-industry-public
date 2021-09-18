import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Row, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { makeId } from 'utils/helpers/random';
import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { faultTreeService } from 'services/FaultTree.service';
import { faultTreeNodeService } from 'services/FaultTreeNode.service';
import { useRenderTree } from 'utils/hooks/useRenderTree';
import { AsideMenu } from 'components/AsideMenu';
import styles from './Trees.module.css';
import { AsideTreeRow } from './AsideTreeRow';
import { AsideNodeRow } from './AsideNodeRow';

const getNewNameWithVersion = (oldName) => {
  const splitName = oldName.split('v. ');
  const version = splitName.length === 2 ? +splitName[1] + 1 : 2;
  return `${splitName[0]} v. ${version}`;
};

export const TreesPage = () => {
  const activeTree = useRef(null);
  const [newTreeName, setNewTreeName] = useState('');

  const [faultTreeNodeDictionary, setFaultTreeNodeDictionary] = useState([]);

  const [trees, setTrees] = useState([]);

  const fetchTrees = () => {
    setTrees(faultTreeService.getAll());
  };

  const handleCopyTree = (oldTree) => {
    const newTree = faultTreeService.create({ name: getNewNameWithVersion(oldTree.name) });
    const oldTreeNodes = faultTreeNodeService.getByFaultTreeId(oldTree.id);

    const idMap = {};

    oldTreeNodes.forEach((oldTreeNode) => {
      const newNode = faultTreeNodeService.create({ ...oldTreeNode, faultTreeId: newTree.id });
      idMap[oldTreeNode.id] = newNode.id;
    });
    const newTreeNodes = faultTreeNodeService.getByFaultTreeId(newTree.id);
    newTreeNodes.forEach((newTreeNode) => {
      faultTreeNodeService.update({
        ...newTreeNode,
        parents: newTreeNode.parents.map((parent) => idMap[parent]),
      });
    });

    fetchTrees();
  };

  const fetchNodes = () => {
    const faultTreeNodesIds = faultTreeNodeService
      .getByFaultTreeId(activeTree.current?.id)
      .map((el) => el.faultTreeNodeDictonaryId);
    const faultTreeNodeDictionary = faultTreeNodeDictionaryService.getAll();
    setFaultTreeNodeDictionary(
      faultTreeNodeDictionary.filter((el) => !faultTreeNodesIds.includes(el.id))
    );
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const handleAddTree = () => {
    faultTreeService.create({ name: newTreeName || `Дерево ${makeId()}` });
    setNewTreeName('');
    fetchTrees();
  };

  const handleSelectTree = (val) => {
    activeTree.current = val;
    fetchNodes();
  };

  const { divId } = useRenderTree({
    treeId: activeTree.current?.id,
    scenarioId: undefined,
    editMode: true,
    onDeleteNode: fetchNodes,
  });

  return (
    <Row align="bottom" gutter={8}>
      <Col span={4}>
        <AsideMenu
          Row={({ item, index }) => (
            <AsideTreeRow
              onCopyTree={handleCopyTree}
              key={index}
              item={item}
              index={index}
              handleSelectTree={handleSelectTree}
            />
          )}
          items={trees}
          Header={
            <Input
              value={newTreeName}
              onChange={(e) => setNewTreeName(e.target.value)}
              placeholder="Новое дерево"
              suffix={<Button type="primary" icon={<PlusOutlined />} onClick={handleAddTree} />}
            />
          }
        />
      </Col>
      <Col span={4}>
        <AsideMenu
          Row={({ item, index }) => (
            <AsideNodeRow item={item} index={index} fetchNodes={fetchNodes} key={index} />
          )}
          items={faultTreeNodeDictionary}
        />
      </Col>
      <Col span={16}>
        <div key={divId} id={divId} className={styles.TreeContent} />
      </Col>
    </Row>
  );
};
