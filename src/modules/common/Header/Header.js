import { Link, useLocation } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { localService } from 'services/local.service';
import styles from './Header.module.css';
import { ImportButton } from './components/ImportButton';

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <Row justify="space-between" className={styles.Header}>
      <Col>
        <Row gutter={16}>
          <Col>
            <Link to="/faultTreeNodeDictionary">
              <Button
                type={pathname === '/faultTreeNodeDictionary' ? 'primary' : 'default'}
                size="large"
              >
                Элементы дерева отказов
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/trees">
              <Button type={pathname === '/trees' ? 'primary' : 'default'} size="large">
                Варианты дерева отказов
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/scenarios">
              <Button type={pathname === '/scenarios' ? 'primary' : 'default'} size="large">
                Сценарии отказов
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row gutter={8}>
          <Col>
            <Button onClick={localService.exportStore}>Экспорт</Button>
          </Col>
          <Col>
            <ImportButton />
          </Col>
          <Col>
            <Button onClick={localService.reset}>Сброс</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
