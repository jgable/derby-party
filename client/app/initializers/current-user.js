
var User = Ember.Object.extend({

});

export default {
    name: 'currentUser',

    initialize: function (container) {
        container.register('user:current', User);
    }
};