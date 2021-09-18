import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import styles from './AsideMenuList.module.css';

export const AsideMenuList = ({ items, onSelectItem }) => {
  return (
    <div className={styles.AsideMenuList}>
      {items.map((item, index) => (
        <Row className={styles.AsideMenuItem} onClick={() => onSelectItem(item)} key={index}>
          <Col span={24}>
            <Button
              onDragStart={(e) => {
                e.dataTransfer.setData('id', item.id);
              }}
              draggable
              className={styles.Button}
              block
            >
              <p>{item.name}</p>
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};
AsideMenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onSelectItem: PropTypes.func,
};
