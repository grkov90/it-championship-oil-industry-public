import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './AsideMenu.module.css';
import { AsideMenuList } from '../AsideMenuList';

export const AsideMenu = ({ Header, items, Row }) => {
  return (
    <div className={styles.AsideMenu}>
      {Header !== undefined && (
        <>
          {Header}
          <Divider className={styles.Divider} />
        </>
      )}
      <AsideMenuList Row={Row} items={items} />
    </div>
  );
};

AsideMenu.propTypes = {
  Header: PropTypes.element,
  items: PropTypes.arrayOf(PropTypes.object),
  Row: PropTypes.func,
};
