var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');

  //Our stuff
  this.resource('party', {path: '/party/:party_id'}, function(){
    this.route('create');
    this.route('edit');
    this.resource('horses');
    this.resource('horse', { path: '/horse/:horse_id' });
  });

});

export default Router;
