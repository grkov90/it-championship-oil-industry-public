export const NodeType = {
	ItResource: 'ItResource',
	ItService: 'ItService',
	BusinessFunction: 'BusinessFunction',
	BusinessProcess: 'BusinessProcess',
	NegativeEvent: 'NegativeEvent',
	Money: 'Money',
}

export class Node {
	name = null; // check
	id = null; // check
	parents = null;
	nodeType; // abstract
	
	constructor(node) {
		const strObj = JSON.stringify(node);
		console.assert(node.name, 'Укажите имя', strObj);
		console.assert(node.id, 'Укажите id', strObj);
		Object.assign(this, node);
	}

	clear() {
		throw new Error('Abstract method');
	}

	label() {
		throw new Error('Abstract method');
	}
}
export class ItResourceNode extends Node {
	rtoTarget = 0;
	rtoTargetChildSum = 0;
	rtoTest = 0;
	rtoTestChildSum = 0;
	nodeType = NodeType.ItResource;	

	clear() {
		this.rtoTargetChildSum = 0;
		this.rtoTestChildSum = 0;
	}

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.ItResource), 'Can be only ItResource nodes');
		this.rtoTargetChildSum = children.reduce((acc, child) => acc + child.rtoTarget + child.rtoTargetChildSum, 0);
		this.rtoTestChildSum = children.reduce((acc, child) => acc + child.rtoTest + child.rtoTestChildSum, 0);
	}

	label() {
		return `ИТ-ресурс: ${this.name}
		RTO целевой: ${this.rtoTarget}
		RTO целевой тест: ${this.rtoTest}`
	}
}

export class ItServiceNode extends Node {
	rtoTargetMax = 0;
	rtoTestMax = 0;
	nodeType = NodeType.ItService;	
	
	clear() {
		this.rtoTargetMax = 0;
		this.rtoTestMax = 0;
	}

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.ItResource), 'Can be only ItResource nodes');
		this.rtoTargetMax = children.length ? Math.max(...children.map(child => child.rtoTarget + child.rtoTargetChildSum)) : 0;
		this.rtoTestMax = children.length ? Math.max(...children.map(child => child.rtoTest + child.rtoTestChildSum)) : 0;
	}

	label() {
		return `ИТ-услуга: ${this.name}
		RTO наибольший: ${this.rtoTargetMax}
		RTO наибольший тест: ${this.rtoTestMax}`
	}
}

export class BusinessFunctionNode extends Node {
	rtoTarget = 0;
	rtoTest = 0;
	waitTimeTarget = 0;
	waitTimeTest = 0;
	nodeType = NodeType.BusinessFunction;	
	
	clear() {
		this.waitTimeTarget = 0;
		this.waitTimeTest = 0;
	}

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.ItService), 'Can be only ItService nodes');
        
		this.waitTimeTarget = (children.length ? Math.max(...children.map(child => child.rtoTargetMax)) : 0) - this.rtoTarget;
		// Позитив должен обнуляться негатив идти на верх
		if (this.waitTimeTarget < 0) {
			this.waitTimeTarget = 0;	
		}
		this.waitTimeTest = (children.length ? Math.max(...children.map(child => child.rtoTestMax)) : 0) - this.rtoTest;
		if (this.waitTimeTest < 0) {
			this.waitTimeTest = 0;	
		}
	}

	label() {
		return `Бизнес функция: ${this.name}
		RTO целевой: ${this.rtoTarget}
		Время простоя: ${this.waitTimeTarget}
		RTO тестовый: ${this.rtoTest}
		Время простоя тест: ${this.waitTimeTest}`
	}
}

export class BusinessProcessNode extends Node {
	nodeType = NodeType.BusinessProcess;	
	waitTimeTarget = 0; 
	waitTimeTest = 0;
	
	clear() {
		this.waitTimeTarget = 0;
		this.waitTimeTest = 0;
	}

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.BusinessFunction), 'Can be only BusinessFunction nodes');

		this.waitTimeTarget = (children.length ? Math.max(...children.map(child => child.waitTimeTarget)) : 0);
		this.waitTimeTest = (children.length ? Math.max(...children.map(child => child.waitTimeTest)) : 0);
	}

	label() {
		return `Бизнес процесс: ${this.name}
		Максимальное время простоя: ${this.waitTimeTarget}
		Максимальное время простоя тест: ${this.waitTimeTest}`
	}
}

export class NegativeEventNode extends Node {
	nodeType = NodeType.NegativeEvent;	
	damageMoney = 0;
	damageMoneyTest = 0;
	calculateDamageMoney = (waitTimeTargetChildSum) => waitTimeTargetChildSum * 1.5;
	
	constructor(node) {		
		super(node);
		console.assert(node.calculateDamageMoney, 'Укажите функцию расчета, например: (waitTimeTargetChildSum) => waitTimeTargetChildSum * 1.5');		
	}

	clear() {
		this.damageMoney = 0;
		this.damageMoneyTest = 0;
	}

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.BusinessProcess), 'Can be only BusinessProcess nodes');

		this.damageMoney = this.calculateDamageMoney(children.reduce((acc, child) => acc + child.waitTimeTarget, 0));
		this.damageMoneyTest = this.calculateDamageMoney(children.reduce((acc, child) => acc + child.waitTimeTest, 0));
	}

	label() {
		return `Негативное событие: ${this.name}
		Потерянные деньги: ${this.damageMoney}
		Потерянные деньги тест: ${this.damageMoneyTest}`
	}
}

export class MoneyNode extends Node {
	nodeType = NodeType.Money;	
	damageMoneySum = 0;
	damageMoneySumTest = 0;
	
	clear() {
		this.damageMoneySum = 0;
		this.damageMoneySumTest = 0;
	}	

	calculateTarget(children = []) {
		console.assert(children.every((child) => child.nodeType === NodeType.NegativeEvent), 'Can be only NegativeEvent nodes');

		this.damageMoneySum = children.reduce((acc, child) => acc + child.damageMoney, 0);
		this.damageMoneySumTest = children.reduce((acc, child) => acc + child.damageMoneyTest, 0);
	}

	label() {
		return `Оценка ущерба: ${this.name}
		Сумма потерянных денег: ${this.damageMoneySum}
		Сумма потерянных денег тест: ${this.damageMoneySumTest}`
	}
}

export class Tree {
	nodes = [] // Node[]
	leafs = []; // Node[]			
	treeObj = null // { [Node.id]: { Node: {+.children} }

	constructor(nodes) {		
		console.assert(nodes.length, 'В дереве должен быть хотя бы один элемент');
		this.nodes = nodes;

		this.makeTree();
		this.findLeafs();
	}
   
	makeTree() {
        const treeObj = this.treeObj = this.nodes.reduce((acc, node) => {
        	acc[node.id] = node;

         	return acc;
        }, {});

		this.nodes.forEach((node) => {
			node.parents.forEach(parentId => {
				if (!parentId) {
					return;
				}
				const parent = treeObj[parentId];
				if (!parent) {
					console.error('Parent not found for nodeId', node.id);
					return;
				}
				const children = parent.children = parent.children || [];
				
				const child = children.find(child => child.id == node.id);
				if (child) {
					console.log('Сyclical dependence in parent', child, node);					
				}

				children.push(node);
			})				
		});		
	}

	findLeafs() {
		this.leafs = this.nodes.reduce((arr, node) => {
			if (!node.children?.length) {
				arr.push(node)
			}

			return arr;
		}, [])
	}

	calculateTarget() {
		this.nodes.forEach(node => node.clear());
		
		const calculateTargetRecursice = (node) => {
			node.calculateTarget(node.children);

			if(node.parents.length) {
				node.parents.forEach(id => id && calculateTargetRecursice(this.treeObj[id]));
			}
		}

		this.leafs.forEach(node => calculateTargetRecursice(node));
	}
}
