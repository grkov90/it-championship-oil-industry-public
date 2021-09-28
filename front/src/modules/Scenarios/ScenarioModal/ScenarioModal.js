import PropTypes from 'prop-types';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { faultScenarioNodesService } from 'services/FaultScenarioNodesService';
import { useEffect } from 'react';
import styles from './ScenarioModal.module.css';
import { TypeFormFields } from '../../../components/TypeFormFields';
import { faultTreeNodeService } from '../../../services/FaultTreeNode.service';
import { faultTreeNodeDictionaryService } from '../../../services/FaultTreeNodeDictionary.service';

export const ScenarioModal = ({
  isVisible,
  diagramNode,
  scenarioId,
  setIsVisible,
  treeController,
}) => {
  const methods = useForm({});
  useEffect(() => {
    const fetchDefaultValue = () => {
      const faultTreeNode = faultTreeNodeService.getById(diagramNode.faultTreeNodeId);
      const dictionaryNode = faultTreeNodeDictionaryService.getById(
        faultTreeNode.faultTreeNodeDictionaryId
      );
      const faultScenarioNode = faultScenarioNodesService.getByFaultTreeNodeId(
        faultTreeNode.faultTreeNodeId,
        scenarioId
      );
      if (!faultScenarioNode) {
        methods.reset({
          target: {
            calculateDamageMoneyString: dictionaryNode.target.calculateDamageMoneyString,
            RTO: dictionaryNode.target.RTO,
            RPO: dictionaryNode.target.RPO,
            costRepair: dictionaryNode.target.costRepair,
          },
          nodeType: diagramNode.nodeType,
        });
      } else {
        methods.reset({
          target: {
            calculateDamageMoneyString:
              faultScenarioNode.scenario.calculateDamageMoneyString ||
              dictionaryNode.target.calculateDamageMoneyString,
            RTO: faultScenarioNode.scenario.RTO,
            RPO: faultScenarioNode.scenario.RPO,
            costRepair: faultScenarioNode.scenario.costRepair || dictionaryNode.target.costRepair,
          },
          nodeType: diagramNode.nodeType,
        });
      }
    };
    if (diagramNode) {
      fetchDefaultValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagramNode]);

  const handleSave = (values) => {
    const faultScenarioNode = faultScenarioNodesService.getByFaultTreeNodeId(
      diagramNode.faultTreeNodeId,
      scenarioId
    );
    if (faultScenarioNode) {
      faultScenarioNodesService.update({
        ...faultScenarioNode,
        scenario: {
          RTO: values.target.RTO,
          RPO: values.target.RPO,
          calculateDamageMoneyString: values.target.calculateDamageMoneyString || undefined,
          costRepair: values.target.costRepair,
        },
      });
    } else {
      faultScenarioNodesService.create({
        faultScenarioId: scenarioId,
        faultTreeNodeId: diagramNode.faultTreeNodeId,
        scenario: {
          RTO: values.target.RTO,
          RPO: values.target.RPO,
          calculateDamageMoneyString: values.target.calculateDamageMoneyString || undefined,
          costRepair: values.target.costRepair,
        },
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
            <Typography>Сценарий для:</Typography>
            <Typography className={styles.header}>{diagramNode?.name}</Typography>
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
  diagramNode: PropTypes.shape({
    faultTreeNodeId: PropTypes.number,
    target: PropTypes.shape({
      calculateDamageMoneyString: PropTypes.string,
      rtoTarget: PropTypes.number,
    }),
    nodeType: PropTypes.string,
    name: PropTypes.string,
  }),
  scenarioId: PropTypes.number,
  setIsVisible: PropTypes.func,
  treeController: PropTypes.shape({
    refreshDiagram: PropTypes.func,
  }),
};
