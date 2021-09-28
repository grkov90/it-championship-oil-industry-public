import { assert } from '../../helpers/assert';
import { FaultTreeNode } from './fault-tree-node';

/**
 * Fault tree.
 */
export class FaultTree {
  constructor(nodesFields) {
    const { nodes, map } = this.makeMap(nodesFields || []);
    this.nodes = nodes;
    this.map = map;
    this.fillChildrenIds();
    this.leafs = this.findLeafs();
  }

  makeMap(nodesFields) {
    const nodes = [];
    const map = nodesFields.reduce((map, fields) => {
      const node = new FaultTreeNode(fields);
      // eslint-disable-next-line no-param-reassign
      map[fields.faultTreeNodeId] = node;
      nodes.push(node);

      return map;
    }, {});

    return { nodes, map };
  }

  getNodeById(id) {
    return this.map[id];
  }

  fillChildrenIds() {
    this.nodes.forEach((child) => {
      child.parentsIds.forEach((parentId) => {
        if (!parentId) {
          return;
        }

        const parent = this.getNodeById(parentId);
        assert(parent, 'Parent not found for node', child);
        parent.childrenIds.push(child.faultTreeNodeId);
      });
    });
  }

  findLeafs() {
    return this.nodes.filter((node) => node.childrenIds.length === 0);
  }

  /**
   * Обход в ширину снизу вверх.
   *
   * @param handler: (faultTreeNodeId, childrenIds) => void
   */
  breadthFirstDownToUp(handler) {
    let parents = new Set(this.leafs);

    const loop = () => {
      if (!parents.size) {
        return;
      }

      const currentParents = [...parents];
      parents = new Set();

      currentParents.forEach((node) => {
        handler(node.faultTreeNodeId, node.childrenIds);

        node.parentsIds.forEach((id) => parents.add(this.getNodeById(id)));
      });

      loop();
    };

    loop();
  }
}
