
export default Ember.Route.extend({
	model: function () {
		return {
			user: this.get('user')
		};
	}
});