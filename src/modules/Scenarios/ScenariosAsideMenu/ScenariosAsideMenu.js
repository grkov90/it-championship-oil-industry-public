import React from 'react';
import { Button, Collapse } from 'antd';
import PropTypes from 'prop-types';
import styles from './ScenariosAsideMenu.module.css';

export const ScenariosAsideMenu = ({ items }) => {
  const { Panel } = Collapse;
  return (
    <Collapse className={styles.ScenariosAsideMenu}>
      {items.map(({ title, scenarios }) => (
        <Panel header={title} key={title}>
          <Button type="primary" ghost className={styles.ScenarioButton} block>
            Добавить сценарий
          </Button>
          {scenarios.map(({ title }) => (
            <Button className={styles.ScenarioButton} block key={title}>
              {title}
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
      title: PropTypes.string,
      scenarios: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        })
      ),
    })
  ),
};
