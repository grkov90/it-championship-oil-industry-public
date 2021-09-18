import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'antd';
import { AsideMenu } from 'components/AsideMenu';
import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { ItemInfo } from './ItemInfo';

export const FaultTreeNodeDictionaryPage = () => {
  const [items, setItems] = useState([]);

  const fetchTreeNodeDictionary = () => {
    setItems(faultTreeNodeDictionaryService.getAll());
  };

  useEffect(() => {
    fetchTreeNodeDictionary();
  }, []);

  const [currentNode, setCurrentNode] = useState(null);

  const handleFormSubmit = (values) => {
    if (currentNode === null) {
      faultTreeNodeDictionaryService.create(values);
    } else {
      faultTreeNodeDictionaryService.update(values);
    }
    fetchTreeNodeDictionary();
  };

  return (
    <Row gutter={8}>
      <Col span={4}>
        <AsideMenu
          Header={
            <Button block type="primary" ghost onClick={() => setCurrentNode(null)}>
              Добавить ноду
            </Button>
          }
          items={items}
          onSelectItem={setCurrentNode}
        />
      </Col>
      <Col span={20}>
        <ItemInfo onSubmit={handleFormSubmit} node={currentNode} />
      </Col>
    </Row>
  );
};
