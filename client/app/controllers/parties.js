export default Ember.ArrayController.extend({
	isEmpty: function () {
		return this.content.get('length') < 1;
	}.property('content.length')
});