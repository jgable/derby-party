export default Ember.Route.extend({
  model:function(params){
    this.store.find("horse");
  }
});