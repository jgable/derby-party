module.exports = {
	options: {
        sourcesContent: true
    },
	vendor: {
		src: [
            'client/components/jquery/dist/jquery.min.js',
            'client/components/handlebars/handlebars.js',
            'client/components/ember/ember.js',
            'client/components/ember-data/ember-data.js',
            'client/components/loader.js/loader.js',
            'client/components/ember-resolver/dist/ember-resolver.js',
            'client/components/ic-ajax/dist/globals/main.js',
            'client/components/ember-load-initializers/ember-load-initializers.js',
            'client/components/lodash/dist/lodash.min.js',
            'client/components/moment/min/moment.min.js',
            'client/components/bootstrap/dist/js/bootstrap.js'
        ],
        dest: 'build/js/vendor.js'
    },
    app: {
        src: ['build/js/app/**/*.js'],
        dest: 'build/js/app-built.js'
    }
};
