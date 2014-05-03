var Bid = DS.Model.extend({
	guest:DS.belongsTo('guest'),
	horse:DS.belongsTo('horse'),
	timeStamp:DS.attr('date'),
	money:DS.attr()
});


Bid.reopenClass({
	FIXTURES:[
		{id:1, guest:1, horse:1, money:22},
		{id:2, guest:2, horse:2, money:555},
		{id:3, guest:2, horse:3, money:77}
	]
});


export default Bid;

