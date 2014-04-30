var Horse = DS.Model.extend({
	name:DS.attr('string'),
	currentBet:DS.belongsTo('bet')
});


Horse.reopenClass({
	FIXTURES:[
		{id:1, name:'Crust Lifter', currentBet:1}, 
		{id:2, name:'Blue Pen', currentBet:2},
		{id:3, name:'Sea Biscuit', currentBet:3}
	]
});


export default Horse;

