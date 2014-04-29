
export default Ember.Route.extend({
  model: function(params) {
    var dfd = Ember.RSVP.defer();
    window.setTimeout(function(){
      dfd.resolve({
        name: "Derby Party",
        age:params.party_id
      });
    },250);
    return dfd.promise;
  }
});
