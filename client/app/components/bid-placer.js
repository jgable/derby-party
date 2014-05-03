export default Ember.Component.extend({
	attributeBindings: ['style'],
	currentHorse:null,
	currentBid:null,
	currentUsers:[],

	newBidder:null,
	newBidAmount:null,

	actions:{
		submitBid:function(){
			console.log('updating bet');
			var newBid = this.store.createRecord('bid', {
				guest:this.get('newBidder'),
				amount:this.get('newBidAmount'),
				horse:this.get('currentHorse')
			});

			newBid.save().then(function(){

			}).fail(function(){
				Ember.run.next(function(){
					newBid.deleteRecord();
				});
			});
		}
	},

	init:function(){
		var that=this;

		this._super();

		console.log(this.get('currentUsers'));

		this.store.find('guest').then(function(users){
		  that.set('currentUsers', users);
		});
	},

	isValidBet:function(){
		var newBidder = this.get('newBidder'),
			newBidAmount = this.get('newBidAmount'),
			isHigherThanCurrentBid = this.get('isHigherThanCurrentBid');

		return newBidder != null && newBidAmount > 0 && isHigherThanCurrentBid;
	}.property('newBidder', 'newBidAmount', 'isHigherThanCurrentBid'),

	isHigherThanCurrentBid:function(){
		var currentBid = this.get('currentBid'),
			isLoaded = this.get('currentBid.isLoaded'),
			currentBidAmount = this.get('currentBid.Amount');

		if(currentBid != null){
			if(isLoaded && this.newBidAmount > currentBidAmount){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}.property('currentBid.isLoaded', 'newBidAmount'),

	isSubmitDisabled:Ember.computed.not('isValidBet')
});
