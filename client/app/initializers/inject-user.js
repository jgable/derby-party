export default {
    name: 'injectCurrentUser',

    initialize: function (container, application) {
        var currentUser = container.lookup('user:current');
        if (currentUser) {
            if (application.get('user')) {
                currentUser.setProperties(application.get('user'));
            }

            container.injection('route', 'user', 'user:current');
            container.injection('controller', 'user', 'user:current');
        }
    }
};