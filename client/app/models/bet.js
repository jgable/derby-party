var Bet = DS.Model.extend({
	user:DS.belongsTo('user'),
	horse:DS.belongsTo('horse'),
	timeStamp:DS.attr('date'),
	money:DS.attr()
});


Bet.reopenClass({
	FIXTURES:[
		{id:1, user:1, horse:1, money:22},
		{id:2, user:2, horse:2, money:555},
		{id:3, user:2, horse:3, money:77}
	]
});


export default Bet;

