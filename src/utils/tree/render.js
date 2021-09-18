import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { faultScenarioService } from 'services/FaultScenario.service';
import { faultScenarioElementService } from 'services/FaultScenarioElement.service';
import { faultTreeNodeService } from 'services/FaultTreeNode.service';
import { NodeType, Tree } from './nodes';
import * as go from './go-debug-hack';
import { dictionary, scenarios, scenarioNodes, trees } from './data';

if (!localStorage.getItem('faultTreeNode')) {
  localStorage.setItem('faultTreeNode', JSON.stringify(trees)); // todo
  localStorage.setItem('faultTreeNodeDictionary', JSON.stringify(dictionary)); // todo
  localStorage.setItem('faultScenarioElement', JSON.stringify(scenarioNodes)); // todo
  localStorage.setItem('faultScenario', JSON.stringify(scenarios)); // todo
}

function log(...args) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

const nodeTypeColor = {
  ItResource: '#bccad6',
  ItService: '#f1e3dd',
  BusinessFunction: '#cfe0e8',
  BusinessProcess: '#b7d7e8',
  NegativeEvent: '#87bdd8',
  Money: '#daebe8',
};

const $ = go.GraphObject.make;

function mainTemplate(diagram) {
  // eslint-disable-next-line no-param-reassign
  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    $(
      go.Shape,
      'Rectangle',
      new go.Binding('fill', 'nodeType', (nodeType) => nodeTypeColor[nodeType])
    ),
    $(
      go.Panel,
      'Table',
      $(go.RowColumnDefinition, { column: 0, alignment: go.Spot.Left }),
      $(go.RowColumnDefinition, { column: 2, alignment: go.Spot.Right }),
      $(
        go.TextBlock,
        {
          margin: new go.Margin(2, 10, 1, 10),
          stroke: 'black',
          font: '10pt Segoe UI, sans-serif',
        },
        new go.Binding('text')
      )
    ),
    $('TreeExpanderButton', {
      'alignment': go.Spot.Right,
      'alignmentFocus': go.Spot.Left,
      'ButtonBorder.figure': 'Rectangle',
    })
  );

  return diagram;
}

function editTreeTemplate(diagram, handlers = {}) {
  window.PIXELRATIO = diagram.computePixelRatio(); // constant needed to determine mouse coordinates on the canvas

  // eslint-disable-next-line no-param-reassign
  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    $(
      go.Shape,
      'Rectangle',
      new go.Binding('fill', 'nodeType', (nodeType) => nodeTypeColor[nodeType])
    ),
    $(
      go.Panel,
      'Table',
      $(go.RowColumnDefinition, { column: 0, alignment: go.Spot.Left }),
      $(go.RowColumnDefinition, { column: 2, alignment: go.Spot.Right }),
      $(
        go.TextBlock,
        {
          margin: new go.Margin(2, 10, 1, 10),
          stroke: 'black',
          font: '10pt Segoe UI, sans-serif',
        },
        new go.Binding('text')
      ),
      $(
        go.Panel,
        'Horizontal',
        { column: 0, row: 1 },
        $(go.Shape, { width: 6, height: 6, toSpot: go.Spot.Left, portId: 'to', toLinkable: true }),
        $(go.TextBlock, 'to')
      ),
      $(
        go.Panel,
        'Horizontal',
        { column: 2, row: 1, rowSpan: 2 },
        $(go.TextBlock, 'from'),
        $(go.Shape, {
          width: 6,
          height: 6,
          fromSpot: go.Spot.Right,
          portId: 'from',
          fromLinkable: true,
        })
      )
    ),
    $('TreeExpanderButton', {
      'alignment': go.Spot.Right,
      'alignmentFocus': go.Spot.Left,
      'ButtonBorder.figure': 'Rectangle',
    })
  );

  diagram.addDiagramListener('LinkDrawn', (event) => {
    const { fromNode, toNode } = event.subject;
    const fromNodeId = fromNode.data.id;
    const toNodeId = toNode.data.id;

    if (handlers.createLinkHandler) {
      handlers.createLinkHandler(fromNodeId, toNodeId, event.subject);
    }
  });

  diagram.addDiagramListener('SelectionDeleted', (event) => {
    event.subject.each((part) => {
      if (part instanceof go.Node && handlers.removeNodeHandler) {
        handlers.removeNodeHandler(part.data.id);
      }

      if (part instanceof go.Link && handlers.removeLinkHandler) {
        handlers.removeLinkHandler(part.fromNode.data.id, part.toNode.data.id);
      }
    });
  });

  // Drag and drop new node.
  const { div } = diagram;
  const dragged = {}; // todo нужна ли?

  div.addEventListener(
    'dragenter',
    (event) => {
      event.preventDefault();
    },
    false
  );

  div.addEventListener(
    'dragover',
    (event) => {
      event.preventDefault();
    },
    false
  );
  div.addEventListener(
    'drop',
    (event) => {
      // prevent default action
      // (open as link for some elements in some browsers)
      event.preventDefault();

      // Dragging onto a Diagram
      const can = event.target;
      const pixelratio = window.PIXELRATIO;

      // if the target is not the canvas, we may have trouble, so just quit:
      if (!(can instanceof HTMLCanvasElement)) return;

      const bbox = can.getBoundingClientRect();
      let bbw = bbox.width;
      if (bbw === 0) bbw = 0.001;
      let bbh = bbox.height;
      if (bbh === 0) bbh = 0.001;
      const mx = event.clientX - bbox.left * (can.width / pixelratio / bbw) - dragged.offsetX;
      const my = event.clientY - bbox.top * (can.height / pixelratio / bbh) - dragged.offsetY;
      const point = diagram.transformViewToDoc(new go.Point(mx, my));
      diagram.startTransaction('new node');
      diagram.model.addNodeData({
        location: point,
        text: event.dataTransfer.getData('id'), // todo this type is string. Should be number
        color: 'lightyellow',
      });
      diagram.commitTransaction('new node');

      // If we were using drag data, we could get it here, ie:
      // var data = event.dataTransfer.getData('text');
    },
    false
  );

  return diagram;
}

function treeNodeToDiagramNode(node) {
  return {
    ...node,
    key: node.id,
    text: node.label() + (node.scenario ? `\n${node.scenarioLabel()}` : ''),
  };
}

// Conver faultTreeNode to TreeNode
function convertFaultTreeNodeToTreeNode(faultTreeNode) {
  const dictNode = faultTreeNodeDictionaryService.getById(faultTreeNode.faultTreeNodeDictonaryId);

  const common = {
    ...faultTreeNode,
    name: dictNode.name,
    nodeType: dictNode.nodeType,
  };

  switch (dictNode.nodeType) {
    case NodeType.BusinessFunction:
    case NodeType.ItResource: {
      return {
        ...common,
        rtoTarget: dictNode.rtoTarget,
      };
    }

    case NodeType.NegativeEvent: {
      return {
        ...common,
        calculateDamageMoneyText: dictNode.calculateDamageMoneyText,
      };
    }

    default:
      return common;
  }
}

export class TreeController {
  constructor(divId) {
    this.treeId = null; // Tree id.
    this.divId = divId;
  }

  renderTree(treeId, scenarioId, editMode) {
    this.treeId = treeId;
    this.scenarioId = scenarioId;

    this.updateTree();
    this.renderDiagram(!editMode); // todo
    this.updateDiagramModel();
  }

  updateTree() {
    const { scenarioId } = this;
    const nodes = faultTreeNodeService.getByFaultTreeId(this.treeId);
    const faultTreeNodes = nodes.map((node) => convertFaultTreeNodeToTreeNode(node));
    const tree = (this.tree = new Tree(faultTreeNodes));
    window.tree = tree; // todo

    if (scenarioId) {
      const scenario = faultScenarioService.getById(scenarioId);
      const scenarioNodes = faultScenarioElementService.getByScenarioId(scenarioId);
      tree.setScenario({
        ...scenario,
        nodes: scenarioNodes,
      });
      this.tree.calculateScenario();
    }
  }

  // Create link
  createLinkHandler(fromId, toId, link) {
    const child = faultTreeNodeService.getById(fromId);
    child.parents = child.parents || [];

    if (child.parents.find((id) => id === toId)) {
      this.diagram.remove(link);
      log('Skip create link', { fromId, toId });
      return;
    }

    child.parents.push(toId);
    faultTreeNodeService.update(child);
    log('Create link', { fromId, toId });
    this.refreshDiagram();
  }

  // Remove link
  removeLinkHandler(fromId, toId) {
    const child = faultTreeNodeService.getById(fromId);
    if (!child) return;
    child.parents = child.parents || [];
    child.parents = child.parents.filter((id) => id !== toId);
    faultTreeNodeService.update(child);
    log('Remove link', { fromId, toId });
    this.refreshDiagram();
  }

  // Create node
  createNodeHandler(id) {
    const node = faultTreeNodeDictionaryService.getById(id);
    const treeNode = faultTreeNodeService.create({
      faultTreeId: this.treeId,
      faultTreeNodeDictonaryId: id,
      parents: [],
    });
    // eslint-disable-next-line no-console
    console.log(node, treeNode);
    // todo
  }

  // Remove node
  removeNodeHandler(id) {
    faultTreeNodeService.remove(id);
    // Remove id from child nodes.
    const nodes = faultTreeNodeService.getAll();
    const updatedNodes = [];
    nodes.forEach((node) => {
      let parents = node.parents || [];
      const len = parents.length;
      parents = parents.filter((parentId) => parentId !== id);

      if (node.parents !== len) {
        updatedNodes.push({
          ...node,
          parents,
        });
      }
    });

    updatedNodes.forEach((node) => {
      faultTreeNodeService.update(node);
    });
  }

  renderDiagram(editMode) {
    const { divId } = this;
    this.divElement = document.getElementById(divId);
    this.divElement.innerHTML = '';

    if (this.diagram) {
      this.diagram.div = null;
    }
    this.diagram = null;

    const diagram = (this.diagram = $(go.Diagram, divId, {
      'initialAutoScale': go.Diagram.Uniform,
      'layout': $(go.LayeredDigraphLayout, {
        direction: 0,
      }),
      'undoManager.isEnabled': true,
    }));

    // Select template.
    if (editMode) {
      editTreeTemplate(diagram, {
        createLinkHandler: this.createLinkHandler.bind(this),
        removeNodeHandler: this.removeNodeHandler.bind(this),
        removeLinkHandler: this.removeLinkHandler.bind(this),
      });
    } else {
      mainTemplate(diagram);
    }

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes,
        corner: 2,
        toShortLength: 4,
      },
      $(go.Shape, { strokeWidth: 1.5, stroke: '#197682' })
    );
  }

  refreshDiagram() {
    this.updateTree();
    this.diagram.model.mergeNodeDataArray(this.tree.nodes.map(treeNodeToDiagramNode));
  }

  updateDiagramModel() {
    const faultTree = this.tree.nodes;

    this.diagram.model = new go.GraphLinksModel(
      faultTree.map(treeNodeToDiagramNode),
      faultTree.reduce(
        (arr, node) => [
          ...arr,
          ...node.parents.reduce((items, parentId) => {
            if (!parentId) {
              return items;
            }
            items.push({ to: parentId, from: node.id });

            return items;
          }, []),
        ],
        []
      )
    );
  }
}
