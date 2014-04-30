
export default Ember.Route.extend({
    templateName: 'party',
    
    model: function (params) {
        /* jshint camelcase:false */
        this.store.find('party', params.party_id);
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
