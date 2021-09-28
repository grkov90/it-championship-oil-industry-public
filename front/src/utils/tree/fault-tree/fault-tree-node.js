import { assert } from '../../helpers/assert';

/**
 * Элемент дерева отказов
 */
export class FaultTreeNode {
  constructor(nodeFields) {
    if (!(nodeFields.nodeType && nodeFields.id)) {
      const strObj = JSON.stringify(nodeFields);
      assert(nodeFields.faultTreeNodeId, 'Укажите faultTreeNodeId', strObj);
    }

    this.fields = { ...nodeFields };
    this.faultTreeNodeId = nodeFields.faultTreeNodeId;
    this.parentsIds = nodeFields.parentsIds || [];
    this.childrenIds = [];
  }
}
