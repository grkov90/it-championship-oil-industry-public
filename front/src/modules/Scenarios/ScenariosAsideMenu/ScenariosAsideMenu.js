import React from 'react';
import { Button, Collapse, Divider, Input } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ScenariosAsideMenu.module.css';

export const ScenariosAsideMenu = ({
  items,
  onScenarioAdd,
  onScenarioSelect,
  newScenarioName,
  setNewScenarioName,
  activeScenario,
  onClearRto,
}) => {
  return (
    <div className={styles.ScenariosAsideMenu}>
      <Button onClick={onClearRto} disabled={!activeScenario}>
        Сценарий частичного отказа
      </Button>
      <Divider className={styles.Divider} />
      <Collapse>
        {items.map((tree) => (
          <Collapse.Panel header={tree.name} key={tree.name}>
            <Input
              className={styles.Input}
              value={newScenarioName}
              onChange={(e) => setNewScenarioName(e.target.value)}
              placeholder="Добавить сценарий"
              suffix={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => onScenarioAdd(tree.id)}
                />
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
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
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
  activeScenario: PropTypes.shape({}),
  onClearRto: PropTypes.func,
};
