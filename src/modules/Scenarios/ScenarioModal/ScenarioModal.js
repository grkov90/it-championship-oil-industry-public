import PropTypes from 'prop-types';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { faultScenarioElementService } from 'services/FaultScenarioElement.service';
import { useEffect } from 'react';
import styles from './ScenarioModal.module.css';
import { TypeFormFields } from '../../../components/TypeFormFields';

export const ScenarioModal = ({ isVisible, node, setIsVisible, treeController }) => {
  const methods = useForm({});
  useEffect(() => {
    const fetchDefaultValue = () => {
      const faultScenarioElement = faultScenarioElementService.getByFaultTreeNodeId(
        node.id,
        node.scenario.id
      );
      if (!faultScenarioElement) {
        methods.reset({
          calculateDamageMoneyString: node.target.calculateDamageMoneyString,
          rtoTarget: node.target.rtoTarget,
          nodeType: node.nodeType,
        });
      } else {
        methods.reset({
          calculateDamageMoneyString: faultScenarioElement.calculateDamageMoneyString,
          rtoTarget: faultScenarioElement.rtoTarget,
          nodeType: node.nodeType,
        });
      }
    };
    if (node) {
      fetchDefaultValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  const handleSave = (values) => {
    const faultScenarioElement = faultScenarioElementService.getByFaultTreeNodeId(
      node.id,
      node.scenario.id
    );
    if (faultScenarioElement) {
      faultScenarioElementService.update({
        ...faultScenarioElement,
        rtoTarget: values.rtoTarget,
        calculateDamageMoneyString: values.calculateDamageMoneyString,
      });
    } else {
      faultScenarioElementService.create({
        scenarioId: node.scenario.id,
        faultTreeNodeId: node.id,
        rtoTarget: values.rtoTarget,
        calculateDamageMoneyString: values.calculateDamageMoneyString || undefined,
      });
    }
    setIsVisible(false);
    treeController.refreshDiagram();
  };

  return (
    <FormProvider {...methods}>
      <Modal onCancel={() => setIsVisible(false)} footer={null} visible={isVisible}>
        <Row gutter={[4, 8]}>
          <Col span={24}>
            <Typography className={styles.header}>{node?.name}</Typography>
          </Col>
          <TypeFormFields span={24} />
          <Col span={12} offset={6}>
            <Button onClick={methods.handleSubmit(handleSave)} block type="primary">
              Сохранить
            </Button>
          </Col>
        </Row>
      </Modal>
    </FormProvider>
  );
};

ScenarioModal.propTypes = {
  isVisible: PropTypes.bool,
  node: PropTypes.shape({
    id: PropTypes.number,
    target: PropTypes.shape({
      calculateDamageMoneyString: PropTypes.string,
      rtoTarget: PropTypes.number,
    }),
    nodeType: PropTypes.string,

    scenario: PropTypes.shape({
      id: PropTypes.number,
    }),
    name: PropTypes.string,
  }),
  setIsVisible: PropTypes.func,
  treeController: PropTypes.shape({
    refreshDiagram: PropTypes.func,
  }),
};
