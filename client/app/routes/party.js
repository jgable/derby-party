export default Ember.Route.extend({
    templateName: 'party',

    beforeModel:function(){
        this.transitionTo('horses');
    },

    actions: {
        remove: function () {
            var self = this;
            this.currentModel.destroy().then(function () {
                self.transitionTo('parties');
            });
        }
    }
});
