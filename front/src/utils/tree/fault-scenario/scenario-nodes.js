import { assert } from '../../helpers/assert';
import { currencyFormatter } from '../../helpers/currency-formatter';
import { NodeType } from '../node-types';

/**
 * Элементы сценария отказов
 */

export class ItResourceScenarioNode {
  constructor(target, scenario) {
    this.target = {
      RTO: 0,
      RPO: 0,
      costRepair: 0,
      ...target,
    };
    this.scenario = {
      ...this.target,
      ...scenario,
    };
    this.calculated = {
      RTOChildSum: 0,
      RPOChildMax: 0,
    };
  }

  calculate(children = []) {
    this.calculated.RTOChildSum = children.length
      ? Math.max(...children.map((child) => child.scenario.RTO + child.calculated.RTOChildSum))
      : 0;

    this.calculated.RPOChildMax = children.length
      ? Math.max(
          ...children.map((child) => Math.max(child.scenario.RPO, child.calculated.RPOChildMax))
        )
      : 0;
  }

  label() {
    return `Проектное RTO: ${this.target.RTO} ч.
    Проектное RPO: ${this.target.RPO} ч.
    Стоимость восстановления: ${currencyFormatter.format(this.target.costRepair)}`;
  }

  scenarioLabel() {
    return `Max RTO нижнего уровня: ${this.calculated.RTOChildSum} ч.
    RTO: ${this.scenario.RTO} ч.
    RPO: ${this.scenario.RPO} ч.
    Max RPO нижнего уровня: ${this.calculated.RPOChildMax} ч.    
    Стоимость восстановления: ${currencyFormatter.format(this.scenario.costRepair)}`;
  }
}

export class ItServiceScenarioNode {
  constructor() {
    this.calculated = {
      RTOMax: 0,
      RPOMax: 0,
    };
  }

  calculate(children = []) {
    this.calculated.RTOMax = children.length
      ? Math.max(...children.map((child) => child.scenario.RTO + child.calculated.RTOChildSum))
      : 0;

    this.calculated.RPOMax = children.length
      ? Math.max(
          ...children.map((child) => Math.max(child.scenario.RPO, child.calculated.RPOChildMax))
        )
      : 0;
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Наибольший RTO: ${this.calculated.RTOMax} ч.
    Наибольший RPO: ${this.calculated.RPOMax} ч.`;
  }
}

export class BusinessFunctionScenarioNode {
  constructor(target, scenario) {
    this.target = {
      RTO: 0,
      RPO: 0,
      ...target,
    };
    this.scenario = {
      ...this.target,
      ...scenario,
    };
    this.calculated = {
      RTOWaitTime: 0,
      RPOWaitTime: 0,
    };
  }

  calculate(children = []) {
    this.calculated.RTOWaitTime =
      (children.length ? Math.max(...children.map((child) => child.calculated.RTOMax)) : 0) -
      this.scenario.RTO;

    // Позитив должен обнуляться, негатив - идти на верх
    if (this.calculated.RTOWaitTime < 0) {
      this.calculated.RTOWaitTime = 0;
    }

    this.calculated.RPOWaitTime =
      (children.length ? children.reduce((acc, child) => acc + child.calculated.RPOMax, 0) : 0) -
      this.scenario.RPO;

    // Позитив должен обнуляться, негатив - идти на верх
    if (this.calculated.RPOWaitTime < 0) {
      this.calculated.RPOWaitTime = 0;
    }
  }

  label() {
    return `Проектный RTO: ${this.target.RTO} ч.
    Проектный RPO: ${this.target.RPO} ч.`;
  }

  scenarioLabel() {
    return `RTO: ${this.scenario.RTO} ч.
		RTO Время простоя: ${this.calculated.RTOWaitTime} ч.
		RPO: ${this.scenario.RPO} ч.
		RPO потеря данных за: ${this.calculated.RPOWaitTime} ч.`;
  }
}

export class BusinessProcessScenarioNode {
  constructor() {
    this.calculated = {
      RTOWaitTimeMax: 0,
      RPOWaitTimeMax: 0,
    };
  }

  calculate(children = []) {
    this.calculated.RTOWaitTimeMax = children.length
      ? Math.max(...children.map((child) => child.calculated.RTOWaitTime))
      : 0;

    this.calculated.RPOWaitTimeMax = children.length
      ? children.reduce((acc, child) => acc + child.calculated.RPOWaitTime, 0)
      : 0;
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `RTO Максимальное время простоя: ${this.calculated.RTOWaitTimeMax} ч.
    RPO суммарно потеря данных за: ${this.calculated.RPOWaitTimeMax} ч.`;
  }
}

export class NegativeEventScenarioNode {
  constructor(target, scenario) {
    this.target = {
      calculateDamageMoneyString: '',
      ...target,
    };
    this.scenario = {
      ...target,
      ...scenario,
    };
    this.calculated = {
      damageMoney: 0,
    };

    assert(
      this.scenario.calculateDamageMoneyString,
      'Укажите функцию расчета, например: (RTOWaitTimeChildSum, RPOWaitTimeChildSum) => RTOWaitTimeChildSum * 1.5'
    );
    // eslint-disable-next-line no-new-func
    this.scenario.calculateDamageMoney = new Function(
      `return ${this.scenario.calculateDamageMoneyString}`
    )();
  }

  calculate(children = []) {
    this.calculated.damageMoney = this.scenario.calculateDamageMoney(
      children.reduce((acc, child) => acc + child.calculated.RTOWaitTimeMax, 0),
      children.reduce((acc, child) => acc + child.calculated.RPOWaitTimeMax, 0)
    );
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Потерянные деньги: ${currencyFormatter.format(this.calculated.damageMoney)}`;
  }
}

export class MoneyScenarioNode {
  constructor() {
    this.calculated = {
      damageMoneySum: 0,
      costRepairSum: 0,
    };
  }

  calculate(children = []) {
    this.calculated.damageMoneySum = children.reduce(
      (acc, child) => acc + child.calculated.damageMoney,
      0
    );
  }

  label() {
    return ``;
  }

  calculateCostRepair(itResourcesNodes) {
    this.calculated.costRepairSum = itResourcesNodes.reduce((acc, itResourceNode) => {
      if (itResourceNode.scenario.RTO > 0) {
        return acc + itResourceNode.scenario.costRepair;
      }
      return acc;
    }, 0);
  }

  scenarioLabel() {
    return `Сумма потерянных денег: ${currencyFormatter.format(this.calculated.damageMoneySum)}
    Стоимость восстановления: ${currencyFormatter.format(this.calculated.costRepairSum)}`;
  }
}

export function makeScenarioNode(nodeType, targetFields, scenarioFields) {
  switch (nodeType) {
    case NodeType.BusinessFunction:
      return new BusinessFunctionScenarioNode(targetFields, scenarioFields);
    case NodeType.BusinessProcess:
      return new BusinessProcessScenarioNode(targetFields, scenarioFields);
    case NodeType.ItResource:
      return new ItResourceScenarioNode(targetFields, scenarioFields);
    case NodeType.ItService:
      return new ItServiceScenarioNode(targetFields, scenarioFields);
    case NodeType.Money:
      return new MoneyScenarioNode(targetFields, scenarioFields);
    case NodeType.NegativeEvent:
      return new NegativeEventScenarioNode(targetFields, scenarioFields);
    default:
      throw new Error(`Неизвестный тип ${JSON.stringify(nodeType)}`);
  }
}
