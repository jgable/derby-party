var Horse = DS.Model.extend({
	name:DS.attr('string'),
	currentBid:DS.belongsTo('bid')
});


Horse.reopenClass({
	FIXTURES:[
		{id:1, name:'Crust Lifter', currentBid:1}, 
		{id:2, name:'Blue Pen', currentBid:2},
		{id:3, name:'Sea Biscuit'}
	]
});


export default Horse;

