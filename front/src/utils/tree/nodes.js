export const NodeType = {
  ItResource: 'ItResource',
  ItService: 'ItService',
  BusinessFunction: 'BusinessFunction',
  BusinessProcess: 'BusinessProcess',
  NegativeEvent: 'NegativeEvent',
  Money: 'Money',
};

export const NodeTypeLabelMap = {
  [NodeType.ItResource]: 'ИТ-ресурс',
  [NodeType.ItService]: 'ИТ-сервис',
  [NodeType.BusinessFunction]: 'Бизнес функция',
  [NodeType.BusinessProcess]: 'Бизнес процесс',
  [NodeType.NegativeEvent]: 'Негативное событие',
  [NodeType.Money]: 'Деньги',
};

export const NodeTypeOptions = Object.entries(NodeTypeLabelMap);

function assert(...args) {
  // eslint-disable-next-line no-console
  console.assert(...args);
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'RUB',
});

export class Node {
  constructor(node) {
    this.name = null; // check
    this.id = null; // check
    this.parents = null;
    this.nodeType = null; // abstract
    this.target = {}; // Проектные данные
    this.scenario = null; // Данные сценария

    const strObj = JSON.stringify(node);
    assert(node.name, 'Укажите имя', strObj);
    assert(node.id, 'Укажите id', strObj);
    this.name = node.name;
    this.id = node.id;
    this.parents = node.parents;
  }

  label() {
    throw new Error('Abstract method');
  }

  setScenario(scenario) {
    this.scenario = { ...this.target, ...this.scenario, ...scenario };
  }

  export() {
    return {
      id: this.id,
      name: this.name,
      parents: this.parents,
      nodeType: this.nodeType,
    };
  }
}

export class ItResourceNode extends Node {
  constructor(fields) {
    super(fields);
    this.nodeType = NodeType.ItResource;
    this.target = {
      rtoTarget: fields.rtoTarget,
      rtoTargetChildSum: 0,
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.ItResource),
      'Can be only ItResource nodes'
    );

    this.scenario.rtoTargetChildSum = children.length
      ? Math.max(
          ...children.map((child) => child.scenario.rtoTarget + child.scenario.rtoTargetChildSum)
        )
      : 0;
  }

  label() {
    return `Проектное RTO: ${this.target.rtoTarget} ч.`;
  }

  scenarioLabel() {
    return `Max RTO нижнего уровня: ${this.scenario.rtoTargetChildSum} ч.
    RTO: ${this.scenario.rtoTarget} ч.`;
  }

  export() {
    return {
      ...super.export(),
      rtoTarget: this.target.rtoTarget,
    };
  }
}

export class ItServiceNode extends Node {
  constructor(fields) {
    super(fields);
    this.nodeType = NodeType.ItService;
    this.target = {
      rtoTargetMax: 0,
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.ItResource),
      'Can be only ItResource nodes'
    );
    this.scenario.rtoTargetMax = children.length
      ? Math.max(
          ...children.map((child) => child.scenario.rtoTarget + child.scenario.rtoTargetChildSum)
        )
      : 0;
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Наибольший RTO: ${this.scenario.rtoTargetMax} ч.`;
  }
}

export class BusinessFunctionNode extends Node {
  constructor(fields) {
    super(fields);
    this.nodeType = NodeType.BusinessFunction;
    this.target = {
      rtoTarget: fields.rtoTarget,
      waitTimeTarget: 0,
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.ItService),
      'Can be only ItService nodes'
    );

    this.scenario.waitTimeTarget =
      (children.length ? Math.max(...children.map((child) => child.scenario.rtoTargetMax)) : 0) -
      this.scenario.rtoTarget;

    // Позитив должен обнуляться, негатив - идти на верх
    if (this.scenario.waitTimeTarget < 0) {
      this.scenario.waitTimeTarget = 0;
    }
  }

  label() {
    return `Проектный RTO: ${this.target.rtoTarget} ч.`;
  }

  scenarioLabel() {
    return `RTO: ${this.scenario.rtoTarget} ч.
		Время простоя: ${this.scenario.waitTimeTarget} ч.`;
  }

  export() {
    return {
      ...super.export(),
      rtoTarget: this.target.rtoTarget,
    };
  }
}

export class BusinessProcessNode extends Node {
  constructor(fields) {
    super(fields);
    this.nodeType = NodeType.BusinessProcess;
    this.target = {
      waitTimeTarget: 0,
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.BusinessFunction),
      'Can be only BusinessFunction nodes'
    );

    this.scenario.waitTimeTarget = children.length
      ? Math.max(...children.map((child) => child.scenario.waitTimeTarget))
      : 0;
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Максимальное время простоя: ${this.scenario.waitTimeTarget} ч.`;
  }
}

export class NegativeEventNode extends Node {
  constructor(node) {
    super(node);
    this.nodeType = NodeType.NegativeEvent;
    this.calculateDamageMoneyText = null;

    assert(
      node.calculateDamageMoneyText,
      'Укажите функцию расчета, например: (waitTimeTargetChildSum) => waitTimeTargetChildSum * 1.5'
    );
    this.calculateDamageMoneyText = node.calculateDamageMoneyText;
    this.target = {
      damageMoney: 0,
      // eslint-disable-next-line no-new-func
      calculateDamageMoney: new Function(`return ${node.calculateDamageMoneyText}`)(),
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.BusinessProcess),
      'Can be only BusinessProcess nodes'
    );

    this.scenario.damageMoney = this.scenario.calculateDamageMoney(
      children.reduce((acc, child) => acc + child.scenario.waitTimeTarget, 0)
    );
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Потерянные деньги: ${currencyFormatter.format(this.scenario.damageMoney)}`;
  }

  export() {
    return {
      ...super.export(),
      calculateDamageMoneyText: this.calculateDamageMoneyText,
    };
  }
}

export class MoneyNode extends Node {
  constructor(node) {
    super(node);
    this.nodeType = NodeType.Money;
    this.target = {
      damageMoneySum: 0,
    };
  }

  calculateScenario(children = []) {
    assert(
      children.every((child) => child.nodeType === NodeType.NegativeEvent),
      'Can be only NegativeEvent nodes'
    );

    this.scenario.damageMoneySum = children.reduce(
      (acc, child) => acc + child.scenario.damageMoney,
      0
    );
  }

  label() {
    return ``;
  }

  scenarioLabel() {
    return `Сумма потерянных денег: ${currencyFormatter.format(this.scenario.damageMoneySum)}`;
  }
}

function createNodeByType(nodeFields) {
  switch (nodeFields.nodeType) {
    case NodeType.BusinessFunction:
      return new BusinessFunctionNode(nodeFields);
    case NodeType.BusinessProcess:
      return new BusinessProcessNode(nodeFields);
    case NodeType.ItResource:
      return new ItResourceNode(nodeFields);
    case NodeType.ItService:
      return new ItServiceNode(nodeFields);
    case NodeType.Money:
      return new MoneyNode(nodeFields);
    case NodeType.NegativeEvent:
      return new NegativeEventNode(nodeFields);
    default:
      throw new Error(`Неизвестный тип ${JSON.stringify(nodeFields)}`);
  }
}

export class Tree {
  constructor(nodes) {
    this.nodes = []; // Node[]
    this.leafs = []; // Node[]
    this.treeObj = null; // { [Node.id]: { Node: {+.children} }

    this.nodes = nodes.map((node) => createNodeByType(node));

    this.makeTree();
    this.findLeafs();
  }

  setScenario(scenario) {
    const { id, name, nodes } = scenario;
    nodes.forEach((scenarioNode) => {
      const faultTreeNode = this.treeObj[scenarioNode.faultTreeNodeId];
      assert(faultTreeNode, 'Не найдена нода для ноды сценария', scenarioNode);
      if (!faultTreeNode) {
        return;
      }

      faultTreeNode.setScenario({ id, name, ...scenarioNode });
    });
    this.nodes.forEach((node) => {
      node.setScenario({ id, name });
    });
  }

  makeTree() {
    const treeObj = (this.treeObj = this.nodes.reduce((acc, node) => {
      acc[node.id] = node;

      return acc;
    }, {}));

    this.nodes.forEach((node) => {
      node.parents.forEach((parentId) => {
        if (!parentId) {
          return;
        }
        const parent = treeObj[parentId];
        assert(parent, 'Parent not found for nodeId', node.id);

        const children = (parent.children = parent.children || []);

        const child = children.find((child) => child.id === node.id);
        assert(!child, 'Сyclical dependence in parent', child, node);

        children.push(node);
      });
    });
  }

  findLeafs() {
    this.leafs = this.nodes.reduce((arr, node) => {
      if (!node.children?.length) {
        arr.push(node);
      }

      return arr;
    }, []);
  }

  calculateScenario() {
    let parents = new Set();

    const calculateScenarioOfNode = (node) => {
      if (!node) {
        return;
      }
      node.calculateScenario(node.children);
      (node.parents || []).forEach((id) => parents.add(id));
    };

    this.leafs.forEach((node) => calculateScenarioOfNode(node));

    const loop = () => {
      if (!parents.size) {
        return;
      }
      const parentsList = [...parents];
      parents = new Set();
      parentsList.forEach((id) => calculateScenarioOfNode(this.treeObj[id]));
      loop();
    };

    loop();
  }
}
