import * as go from './lib/go-debug-hack';

export default function render(tree) {	

  const nodeTypeColor = { 
    ItResource: '#bccad6',
    ItService: '#f1e3dd',
    BusinessFunction: '#cfe0e8',
    BusinessProcess: '#b7d7e8',
    NegativeEvent: '#87bdd8',
    Money: '#daebe8',
  }

	const $ = go.GraphObject.make;	
	const diagram = $(go.Diagram, 'fault-tree', {
            initialAutoScale: go.Diagram.Uniform,
            layout:
              $(go.LayeredDigraphLayout,
                { 
                  direction: 0,
                }),
            "undoManager.isEnabled": true
          });

	 diagram.nodeTemplate =  // the default node template
        $(go.Node, "Spot",
          { selectionObjectName: "BODY", locationSpot: go.Spot.Center, locationObjectName: "BODY" },
          // the main "BODY" consists of a Rectangle surrounding some text           
          $(go.Panel, "Auto",
            { name: "BODY", portId: "" },
            $(go.Shape,
              { fill: "#1976823b", stroke:null},              
              new go.Binding("fill", "nodeType", (nodeType) => nodeTypeColor[nodeType] ),
              ),
            $(go.TextBlock,
              {
                margin: new go.Margin(2, 10, 1, 10),
                stroke: "black", font: "10pt Segoe UI, sans-serif"
              },
              new go.Binding("text"))
          ),  // end "BODY", an Auto Panel
          $("TreeExpanderButton", { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, "ButtonBorder.figure": "Rectangle" }),                        
        );

      diagram.linkTemplate =
        $(go.Link,
          {
            routing: go.Link.AvoidsNodes,
            corner: 2,
            toShortLength: 4},          
          $(go.Shape,
            { strokeWidth: 1.5,
              stroke: '#197682',
             })
        );

    	diagram.model = new go.GraphLinksModel(
    		tree.nodes.map(node => {
    			node.key = node.id;
          node.text = node.label();
    			return node;
    		}),
    		tree.nodes.reduce((arr, node) => [
            ...arr, 
            ...node.parents.reduce((items, parentId) => {
              if (!parentId) {
                return items;
              }
              items.push({from: parentId, to: node.id});
              
              return items;
            }, [])
          ], []
        )
      );      
}