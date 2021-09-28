/**
 * Types of fault tree nodes.
 */

/**
 * NodeTypes
 */
export const NodeType = {
  ItResource: 'ItResource',
  ItService: 'ItService',
  BusinessFunction: 'BusinessFunction',
  BusinessProcess: 'BusinessProcess',
  NegativeEvent: 'NegativeEvent',
  Money: 'Money',
};

/**
 * NodeTypes labels
 */
export const NodeTypeLabelMap = {
  [NodeType.ItResource]: 'ИТ-ресурс',
  [NodeType.ItService]: 'ИТ-сервис',
  [NodeType.BusinessFunction]: 'Бизнес функция',
  [NodeType.BusinessProcess]: 'Бизнес процесс',
  [NodeType.NegativeEvent]: 'Негативное событие',
  [NodeType.Money]: 'Деньги',
};
