
export default Ember.Route.extend({
  model: function(params) {
    return [{name:'peanut', horse_id:1},{name:'tails', horse_id:2},{name:'knuckle', horse_id:3},{name:'jabber', horse_id:4}];
    // return {
    //   name: "John",
    //   age:params.horse_id
    // };
  }
});
