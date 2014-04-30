export default Ember.ArrayController.extend({
	isEmpty: function () {
		return this.content.length < 1;
	}.property('content')
});