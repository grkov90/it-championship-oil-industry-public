import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './AsideMenu.module.css';
import { AsideMenuList } from '../AsideMenuList';

export const AsideMenu = ({ Header, items, onSelectItem }) => {
  return (
    <div className={styles.AsideMenu}>
      {Header !== undefined && (
        <>
          {Header}
          <Divider className={styles.Divider} />
        </>
      )}
      <AsideMenuList items={items} onSelectItem={onSelectItem} />
    </div>
  );
};

AsideMenu.propTypes = {
  Header: PropTypes.element,
  items: PropTypes.arrayOf(PropTypes.object),
  onSelectItem: PropTypes.func,
};
