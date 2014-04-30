var Party = DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	owner: DS.belongsTo('user')
});

Party.reopenClass({
	FIXTURES:[
		{id:1, title:'Fun party', slug:'funparty', owner:1}
	]
});

export default Party;