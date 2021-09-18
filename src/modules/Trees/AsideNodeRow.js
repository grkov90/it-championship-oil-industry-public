import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import styles from '../FaultTreeNodeDictionary/ItemInfo.module.css';

export const AsideNodeRow = ({ item, index, fetchNodes }) => {
  return (
    <Row key={index}>
      <Col span={24}>
        <Button
          onDragEnd={fetchNodes}
          onDragStart={(e) => {
            e.dataTransfer.setData('id', item.id);
            e.dataTransfer.setData('offsetX', e.nativeEvent.offsetX - e.target.clientWidth / 2);
            e.dataTransfer.setData('offsetY', e.nativeEvent.offsetY - e.target.clientHeight / 2);
          }}
          draggable
          className={styles.Button}
          block
        >
          <p>{item.name}</p>
        </Button>
      </Col>
    </Row>
  );
};

AsideNodeRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  index: PropTypes.number,
  fetchNodes: PropTypes.func,
};
