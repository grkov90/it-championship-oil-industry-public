import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Header.module.css';

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.Header}>
      <Button
        type={pathname === '/faultTreeNodeDictionary' ? 'primary' : 'default'}
        className={styles.button}
        size="large"
      >
        <Link to="/faultTreeNodeDictionary">Ноды</Link>
      </Button>
      <Button
        type={pathname === '/trees' ? 'primary' : 'default'}
        className={styles.button}
        size="large"
      >
        <Link to="/trees">Деревья</Link>
      </Button>
      <Button
        type={pathname === '/scenarios' ? 'primary' : 'default'}
        className={styles.button}
        size="large"
      >
        <Link to="/scenarios">Сценарии</Link>
      </Button>
    </div>
  );
};
