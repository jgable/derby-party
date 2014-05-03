export default Ember.Component.extend({
	attributeBindings: ['style'],
	currentBid:null,
	currentUsers:[],

	newBid:null,
	newBidder:null,
	newBidValue:null,

	actions:{
		submitBid:function(){
			console.log('updating bet');
		},
		chooseBidder:function(){
			console.log('Choosing Bidder');
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
			newBidValue = this.get('newBidValue'),
			isHigherThanCurrentBid = this.get('isHigherThanCurrentBid');

		return newBidder != null && newBidValue > 0 && isHigherThanCurrentBid;
	}.property('newBidder', 'newBidValue', 'isHigherThanCurrentBid'),

	isHigherThanCurrentBid:function(){
		var currentBid = this.get('currentBid'),
			isLoaded = this.get('currentBid.isLoaded'),
			currentBidMoney = this.get('currentBid.money');

		if(currentBid != null){
			if(isLoaded && this.newBidValue > currentBidMoney){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}.property('currentBid.isLoaded', 'newBidValue'),

	isSubmitDisabled:Ember.computed.not('isValidBet')
});
