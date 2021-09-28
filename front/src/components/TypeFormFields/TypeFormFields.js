import { Card, Col, Input } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { NodeType } from '../../utils/tree/node-types';

/**
 * Набор полей для формы редактирования элемента дерева.
 */
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
        <>
          <Col span={span}>
            <Card title="RTO" size="small">
              <Controller
                name="target.RTO"
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
          <Col span={span}>
            <Card title="RPO" size="small">
              <Controller
                name="target.RPO"
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
          <Col span={span}>
            <Card title="Стоимость восстановления" size="small">
              <Controller
                name="target.costRepair"
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
        </>
      )}
      {nodeType === NodeType.NegativeEvent && (
        <Col span={span}>
          <Card title="Формула расчета ущерба" size="small">
            <Controller
              name="target.calculateDamageMoneyString"
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
