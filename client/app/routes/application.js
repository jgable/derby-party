
var AppModel = Ember.Object.extend({
    user: null,
    isLoggedIn: function () {
        var user = this.get('user');

        return !!(user && _.isNumber(user.id));
    }.property('user')
});

export default Ember.Route.extend({
    actions: {
        loggedIn: function (user) {
            // Set the user on the container and subsequent routes
            this.container.lookup('user:current').setProperties(user);

            // Update our user in the AppModel so the login links change
            this.currentModel.set('user', user);
        }
    },

    model: function () {
        return AppModel.create({
            user: this.get('user')
        });
    }
});