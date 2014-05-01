
export default Ember.Route.extend({
    templateName: 'party',

    actions: {
        remove: function () {
            var self = this;
            this.currentModel.destroy().then(function () {
                self.transitionTo('parties');
            });
        }
    }
});
