import React from 'react';
import PropTypes from 'prop-types';
import styles from './AsideMenuList.module.css';

export const AsideMenuList = ({ items, Row }) => {
  return (
    <div className={styles.AsideMenuList}>
      {items.map((item, index) => (
        <Row key={index} item={item} index={index} />
      ))}
    </div>
  );
};
AsideMenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  Row: PropTypes.func,
};
