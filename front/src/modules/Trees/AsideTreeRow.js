import PropTypes from 'prop-types';
import { Button, Col, Popover, Row } from 'antd';
import styles from '../FaultTreeNodeDictionary/ItemInfo.module.css';

export const AsideTreeRow = ({ item, index, handleSelectTree, onCopyTree }) => {
  return (
    <Row onClick={() => handleSelectTree(item)} key={index}>
      <Col span={24}>
        <Popover
          trigger="contextMenu"
          content={
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCopyTree(item);
              }}
            >
              Копировать
            </Button>
          }
        >
          <Button block className={styles.Button}>
            <p>{item.name}</p>
          </Button>
        </Popover>
      </Col>
    </Row>
  );
};

AsideTreeRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
  }),
  index: PropTypes.number,
  handleSelectTree: PropTypes.func,
  onCopyTree: PropTypes.func,
};
