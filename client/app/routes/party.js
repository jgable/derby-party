
export default Ember.Route.extend({
  model: function(params) {
    this.store.find('party', params.party_id);
  }
});
