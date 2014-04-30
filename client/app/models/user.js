var User = DS.Model.extend({
	name:DS.attr('string')
});


User.reopenClass({
	FIXTURES:[
		{id:1,name:"Hope Short"},
		{id:2,name:"Ryan Skurkis"}
	]
});


export default User;

