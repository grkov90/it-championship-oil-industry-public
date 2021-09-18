import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Card, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import { usePrev } from '../../utils/hooks/usePrev';

export const ItemInfo = ({ node, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm({ defaultValues: node });
  const prevNode = usePrev(node);
  useEffect(() => {
    if (prevNode?.id !== node?.id) {
      if (node === null) {
        reset({});
      } else {
        reset(node);
      }
    }
  }, [node, prevNode, reset]);

  return (
    <form>
      <Row gutter={[4, 4]}>
        <Col span={12}>
          <Card title="Название" size="small">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Тип" size="small">
            <Controller
              name="nodeType"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="RTO целевое" size="small">
            <Controller
              name="rtoTarget"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="calculateDamageMoney" size="small">
            <Controller
              name="calculateDamageMoneyString"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
        <Col span={4} offset={10}>
          <Button onClick={handleSubmit(onSubmit)} block type="primary">
            Сохранить
          </Button>
        </Col>
      </Row>
    </form>
  );
};

ItemInfo.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    rtoTarget: PropTypes.string,
    calculateDamageMoneyString: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
