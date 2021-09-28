import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Input, Card, Col, Row, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { usePrev } from 'utils/hooks/usePrev';
import { TypeFormFields } from 'components/TypeFormFields';
import styles from './ItemInfo.module.css';
import { NodeTypeLabelMap } from '../../utils/tree/node-types';

/**
 * Набор полей для элементов словаря
 */
export const ItemInfo = ({ node, onSubmit }) => {
  const methods = useForm({ defaultValues: node });
  const prevNode = usePrev(node);
  const NodeTypeOptions = Object.entries(NodeTypeLabelMap);

  useEffect(() => {
    if (prevNode?.faultTreeNodeDictionaryId !== node?.faultTreeNodeDictionaryId) {
      if (node === null) {
        methods.reset({});
      } else {
        methods.reset(node);
      }
    }
  }, [node, prevNode, methods.reset, methods]);

  return (
    <FormProvider {...methods}>
      <Row gutter={[4, 4]}>
        <Col span={12}>
          <Card title="Название" size="small">
            <Controller
              name="name"
              control={methods.control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Тип" size="small">
            <Controller
              name="nodeType"
              control={methods.control}
              render={({ field }) => (
                <Select className={styles.select} {...field}>
                  {NodeTypeOptions.map(([key, label]) => (
                    <Select.Option key={key} value={key}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Card>
        </Col>
        <TypeFormFields span={12} />
        <Col span={4} offset={10}>
          <Button onClick={methods.handleSubmit(onSubmit)} block type="primary">
            Сохранить
          </Button>
        </Col>
      </Row>
    </FormProvider>
  );
};

ItemInfo.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string,
    faultTreeNodeDictionaryId: PropTypes.number,
    type: PropTypes.string,
    rtoTarget: PropTypes.string,
    calculateDamageMoneyString: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};
