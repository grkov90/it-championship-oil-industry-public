import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'antd';
import { AsideMenu } from 'components/AsideMenu';
import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { ItemInfo } from './ItemInfo';
import styles from './ItemInfo.module.css';

/**
 * Страница справочника элементов дерева отказов.
 */
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
          Row={({ item, index }) => (
            <Row onClick={() => setCurrentNode(item)} key={index}>
              <Col span={24}>
                <Button block className={styles.Button}>
                  <p>{item.name}</p>
                </Button>
              </Col>
            </Row>
          )}
          Header={
            <Button block type="primary" ghost onClick={() => setCurrentNode(null)}>
              Добавить элемент
            </Button>
          }
          items={items}
        />
      </Col>
      <Col span={20}>
        <ItemInfo onSubmit={handleFormSubmit} node={currentNode} />
      </Col>
    </Row>
  );
};
