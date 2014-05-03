var Guest = DS.Model.extend({
	name: DS.attr('string'),
	bids: DS.hasMany('bid')
});

Guest.reopenClass({
	FIXTURES:[
		{id:1, name: 'Hope Short', party: 1 },
		{id:2, name: 'Ryan Skurkis', party: 1 },
		{id:3, name: 'Krissy Gable', party: 1 },
		{id:4, name: 'Jacob Gable', party: 1 },
	]
});

export default Guest;