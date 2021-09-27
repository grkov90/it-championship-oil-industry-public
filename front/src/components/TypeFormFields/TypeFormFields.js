import { Card, Col, Input } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { NodeType } from 'utils/tree/nodes';

export const TypeFormFields = ({ span }) => {
  const { control } = useFormContext();
  const nodeType = useWatch({
    control,
    name: 'nodeType', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: '', // default value before the render
  });

  return (
    <>
      {(nodeType === NodeType.ItResource || nodeType === NodeType.BusinessFunction) && (
        <Col span={span}>
          <Card title="RTO целевое" size="small">
            <Controller
              name="rtoTarget"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? undefined : +e.target.value)
                  }
                />
              )}
            />
          </Card>
        </Col>
      )}
      {nodeType === NodeType.NegativeEvent && (
        <Col span={span}>
          <Card title="calculateDamageMoney" size="small">
            <Controller
              name="calculateDamageMoneyString"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Card>
        </Col>
      )}
    </>
  );
};

TypeFormFields.propTypes = {
  span: PropTypes.number,
};
