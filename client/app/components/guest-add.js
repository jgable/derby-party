export default Ember.Component.extend({
	guestName:null,
	partyId:null,

	actions: {
		addGuest: function () {
			debugger;
			var that = this,
				name = this.get('guestName');

			var guest = this.store.createRecord('guest', {
				name: this.get('guestName'),
				party: this.get('partyId')
			});

			guest.save().then(function(){
				that.set('guestName', null);
			});
		}	
	},

	isValidGuestName:function(){
		var guestName = this.get('guestName');
		if(guestName && guestName.length > 0){
			return true;
		}else{
			return false;
		}
	}.property('guestName'),

	isSubmitDisabled:Ember.computed.not('isValidGuestName')

});