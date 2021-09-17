/**
 *  TZ
	// Share
	name: Parent
	id: 1
	parent: null,
	nodeType: "ItResource" | "ItService" | "BusinessFunction" | "BusinessProcess" | "NegativeEvent"  | "Money"

	// ItResource
	rtoTarget: 3
	rtoTargetChildSum: 4,
	rtoTest: 3,
	rtoTestChildSum: 5,

	// ItService
	rtoTargetMax: max({ItResource}rtoTarget+ rtoTargetChildSum)
	rtoTestMax: max({ItResource}rtoTest+ rtoTestChildSum)

	// BusinessFunction
	rtoTarget: 1,
	rtoTest: 3,
	waitTimeTarget:  rtoTarget - max({ItService}.rtoTargetSum)
	waitTimeTest:  rtoTest - max({ItService}.rtoTestSum)

	// BusinessProcess
	waitTimeTarget:  max({BusinessFunction}.waitTimeTarget)
	waitTimeTest:  max({BusinessFunction}.waitTimeTest)

	// NegativeEvent
	damageMoney: calculateDamageMoney(sum({BusinessProcess}.waitTimeTarget))
	damageMoneyTest:  calculateDamageMoneyTest(sum({BusinessProcess}.waitTimeTest))

	// Money
	damageMoneySum: (sum({NegativeEvent}.damageMoney))
	damageMoneyTest: (sum({NegativeEvent}.damageMoneyTest))
**/

import { Tree } from './nodes';
import testModelData from './data';
import render from './render';

function init() {
	const tree = new Tree(testModelData);
	tree.calculateTarget();
	render(tree);
}

window.addEventListener('DOMContentLoaded', init);

