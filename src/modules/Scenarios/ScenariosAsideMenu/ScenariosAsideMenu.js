/* eslint-disable */
import React from 'react';
import { Button, Collapse, Input } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ScenariosAsideMenu.module.css';

export const ScenariosAsideMenu = ({
  items,
  onScenarioAdd,
  onScenarioSelect,
  newScenarioName,
  setNewScenarioName,
}) => {
  const { Panel } = Collapse;
  return (
    <Collapse className={styles.ScenariosAsideMenu}>
      {items.map((tree) => (
        <Panel header={tree.name} key={tree.name}>
           <Input
             className={styles.Input}
            value={newScenarioName}
            onChange={(e) => setNewScenarioName(e.target.value)}
            placeholder="Добавить сценарий"
            suffix={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => onScenarioAdd(tree.id)} />
            }
           />
          {tree.scenarios.map((scenario) => (
            <Button
              onClick={() => onScenarioSelect(scenario)}
              className={styles.ScenarioButton}
              block
              key={scenario.name}
            >
              {scenario.name}
            </Button>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
};

ScenariosAsideMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      scenarios: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ),
  onScenarioAdd: PropTypes.func,
  onScenarioSelect: PropTypes.func,
  setNewScenarioName: PropTypes.func,
  newScenarioName: PropTypes.string,
};
