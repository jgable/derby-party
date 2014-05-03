
export default Ember.ObjectController.extend({
	needs:['party'],
	guestName: null,

	amOwner: function () {
		var user = this.get('user'),
			content = this.content;

		return content && user.get('isLoggedIn') && content.UserId === user.get('id');
	}.property('user.isLoggedIn', 'user.id', 'content.UserId'),
});