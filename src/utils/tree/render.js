import { faultTreeNodeDictionaryService } from 'services/FaultTreeNodeDictionary.service';
import { faultScenarioService } from 'services/FaultScenario.service';
import { faultScenarioElementService } from 'services/FaultScenarioElement.service';
import { faultTreeNodeService } from 'services/FaultTreeNode.service';
import { NodeType, Tree, NodeTypeLabelMap } from './nodes';
import * as go from './diagram-lib';

function log(...args) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

const nodeTypeColor = {
  ItResource: { fill: '#ffffff', text: '#000000' },
  ItService: { fill: '#cfe2e9', text: '#000000' },
  BusinessFunction: { fill: '#a6cdf4', text: '#000000' },
  BusinessProcess: { fill: '#6ba9ef', text: '#000000' },
  NegativeEvent: { fill: '#4286da', text: '#ffffff' },
  Money: { fill: '#1d64c2', text: '#ffffff' },
};

const $ = go.GraphObject.make;

function mainTemplate(diagram, editMode, handlers) {
  window.PIXELRATIO = diagram.computePixelRatio(); // constant needed to determine mouse coordinates on the canvas

  // eslint-disable-next-line no-param-reassign
  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    { isShadowed: true },
    $(
      go.Shape,
      'RoundedRectangle',
      { strokeWidth: 0.5 },
      new go.Binding('fill', 'nodeType', (nodeType) => nodeTypeColor[nodeType].fill)
    ),
    $(
      go.Panel,
      'Table',
      $(go.RowColumnDefinition, { isRow: false, column: 1, maximum: 350 }),
      $(
        go.Panel,
        'Vertical',
        {
          stretch: go.GraphObject.Horizontal,
          alignment: go.Spot.Left,
          row: 0,
          column: 1,
          margin: 5,
        },
        $(
          go.TextBlock,
          {
            alignment: go.Spot.Left,
            font: '11pt Calibri, sans-serif',
            textAlign: 'left',
            isUnderline: true,
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('text', 'nodeType', (nodeType) => `${NodeTypeLabelMap[nodeType]}:`)
        ),
        $(
          go.TextBlock,
          {
            font: '11pt Calibri, sans-serif',
            textAlign: 'left',
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('text', 'name')
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.Left,
            font: 'bold 11pt Calibri, sans-serif',
            textAlign: 'left',
            margin: new go.Margin(2, 0, 0, 0),
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('text', 'label'),
          new go.Binding('visible', 'label', (label) => !!label)
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.Left,
            font: '11pt Calibri, sans-serif',
            textAlign: 'left',
            text: 'Сценарий:',
            isUnderline: true,
            margin: new go.Margin(5, 0, 0, 0),
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('visible', 'scenario', (scenario) => !!scenario)
        ),
        $(
          go.TextBlock,
          {
            font: '11pt Calibri, sans-serif',
            textAlign: 'left',
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('text', 'scenario', (scenario) => scenario.name),
          new go.Binding('visible', 'scenario', (scenario) => !!scenario)
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.Left,
            font: 'bold 11pt Calibri, sans-serif',
            textAlign: 'left',
          },
          new go.Binding('stroke', 'nodeType', (nodeType) => nodeTypeColor[nodeType].text),
          new go.Binding('text', 'scenarioLabel')
        )
      ),
      $(
        go.Panel,
        'Horizontal',
        { column: 0, row: 2, visible: editMode },
        $(go.Shape, 'Triangle', {
          width: 6,
          height: 6,
          toSpot: go.Spot.Bottom,
          portId: 'to',
          toLinkable: true,
          angle: 90,
        })
      ),
      $(
        go.Panel,
        'Horizontal',
        { column: 2, row: 2, visible: editMode },
        $(go.Shape, 'Triangle', {
          width: 6,
          height: 6,
          fromSpot: go.Spot.Top,
          portId: 'from',
          fromLinkable: true,
          angle: 90,
        })
      )
    )
  );

  if (!editMode) {
    diagram.addDiagramListener('ObjectSingleClicked', (event) => {
      handlers.onClickScenarioHandler(event.subject.part.data);
    });
  } else {
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
    // const dragged = {}; // todo нужна ли?

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

        const draggedOffsetX = parseInt(event.dataTransfer.getData('offsetX'), 10);
        const draggedOffsetY = parseInt(event.dataTransfer.getData('offsetY'), 10);

        const mx = event.clientX - bbox.left * (can.width / pixelratio / bbw) - draggedOffsetX;
        const my = event.clientY - bbox.top * (can.height / pixelratio / bbh) - draggedOffsetY;
        const point = diagram.transformViewToDoc(new go.Point(mx, my));
        log('New point', point);

        diagram.startTransaction('new node');
        const dictionaryNodeId = parseInt(event.dataTransfer.getData('id'), 10);
        handlers.createNodeHandler(dictionaryNodeId);
        diagram.commitTransaction('new node');
        event.preventDefault();
      },
      false
    );
  }

  return diagram;
}

function treeNodeToDiagramNode(node) {
  return {
    ...node,
    key: node.id,
    label: node.label(),
    scenarioLabel: node.scenario ? node.scenarioLabel() : '',
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
  // onClickScenarioNode(treeNode) {}
  // onDeleteNode(faultTreeNodeId) {}
  constructor({ divId, onClickScenarioNode, onDeleteNode }) {
    this.treeId = null; // Tree id.
    this.divId = divId;
    this.onClickScenarioNode = onClickScenarioNode;
    this.onDeleteNode = onDeleteNode;
  }

  renderTree(treeId, scenarioId, editMode) {
    this.treeId = treeId;
    this.scenarioId = scenarioId;

    this.updateTree();
    this.renderDiagram(editMode);
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
    faultTreeNodeService.update({
      ...child,
      parents: child.parents.filter((id) => id !== toId),
    });
    log('Remove link', { fromId, toId });
    this.refreshDiagram();
  }

  // Create node
  createNodeHandler(id) {
    const treeNode = faultTreeNodeService.create({
      faultTreeId: this.treeId,
      faultTreeNodeDictonaryId: id,
      parents: [],
    });

    this.refreshDiagram();
    return treeNode;
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

    this.refreshDiagram();

    if (this.onDeleteNode) {
      this.onDeleteNode(id);
    }
  }

  onClickScenarioHandler(treeNode) {
    switch (treeNode.nodeType) {
      case NodeType.ItResource:
      case NodeType.BusinessFunction:
      case NodeType.NegativeEvent: {
        if (this.onClickScenarioNode) {
          this.onClickScenarioNode(treeNode);
        }
        return false;
      }
      default: {
        return false;
      }
    }
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
      'allowDelete': editMode,
      'initialAutoScale': go.Diagram.Uniform,
      'layout': $(go.LayeredDigraphLayout, {
        direction: 0,
        linkSpacing: 15,
        layerSpacing: 150,
        columnSpacing: 10,
        packOption: go.LayeredDigraphLayout.PackExpand,
        layeringOption: go.LayeredDigraphLayout.LayerLongestPathSink,
      }),
      'undoManager.isEnabled': true,
    }));

    // Select template.
    mainTemplate(diagram, editMode, {
      onClickScenarioHandler: this.onClickScenarioHandler.bind(this),
      createLinkHandler: this.createLinkHandler.bind(this),
      removeNodeHandler: this.removeNodeHandler.bind(this),
      removeLinkHandler: this.removeLinkHandler.bind(this),
      createNodeHandler: this.createNodeHandler.bind(this),
    });

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes,
      },
      $(go.Shape, { strokeWidth: 1, stroke: '#b2b2b2' })
    );
  }

  refreshDiagram() {
    this.updateTree();
    this.diagram.model.commit((m) => {
      m.mergeNodeDataArray(this.tree.nodes.map(treeNodeToDiagramNode));
    });
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
