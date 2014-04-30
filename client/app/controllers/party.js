
export default Ember.Controller.extend({
	amOwner: function () {
		var user = this.get('user'),
			content = this.get('content');

		return content && user.get('isLoggedIn') && content.UserId === user.get('id');
	}.property('user', 'content')
});