export default Ember.Component.extend({
	attributeBindings: ['style'],
	currentBet:null,
	currentUsers:[],
	newBet:null,

	actions:{
		updateBet:function(){
			console.log('updating bet');
		}
	},

	init:function(){
		var that=this;

		this._super();
		this.set('newBet', this.store.createRecord('bet',{
			money:600
		}));

		that.set('currentUsers', [1,2,3,4]);
		
		// this.store.find('user').then(function(users){
		//   that.set('currentUsers', users);
		// });
	}

});
