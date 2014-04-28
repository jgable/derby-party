
export default Ember.Route.extend({
  model: function(params) {
    var dfd = Ember.RSVP.defer();
    window.setTimeout(function(){
        dfd.resolve({
          name: "John",
          age:params.horse_id
        });
    },250);
    return dfd.promise;
    // return {
    //   name: "John",
    //   age:params.horse_id
    // };
  }
});
