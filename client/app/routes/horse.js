export default Ember.Route.extend({
	model:function(params){
		return this.store.find("horse", params.horse_id);
	}
});