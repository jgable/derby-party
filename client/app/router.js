var Router = Ember.Router.extend({
    location: 'pushState' in window.history ? 'history' : undefined
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('forgotpassword');

  //Our stuff
  this.resource('party', {path: '/party/:party_id'}, function(){
    this.route('create');
    this.route('edit');
    this.resource('horses');
    this.resource('horse', { path: '/horse/:horse_id' });
  });

});

export default Router;
