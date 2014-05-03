var Bid = DS.Model.extend({
	guest:DS.belongsTo('guest'),
	horse:DS.belongsTo('horse'),
	timeStamp:DS.attr('date'),
	amount:DS.attr()
});


Bid.reopenClass({
	FIXTURES:[
		{id:1, guest:1, horse:1, amount:22},
		{id:2, guest:2, horse:2, amount:555},
		{id:3, guest:2, horse:3, amount:77}
	]
});


export default Bid;

