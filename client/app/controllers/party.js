
export default Ember.ObjectController.extend({
	guestName: null,

	amOwner: function () {
		var user = this.get('user'),
			content = this.content;

		return content && user.get('isLoggedIn') && content.UserId === user.get('id');
	}.property('user.isLoggedIn', 'user.id', 'content.UserId'),

	actions: {
		addGuest: function () {
			var name = this.get('guestName');

			var guest = this.store.createRecord('guest', {
				name: name,
				party: this.get('id')
			});

			guest.save();
		}
	}
});