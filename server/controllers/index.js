'use strict';

var _ = require('lodash');

module.exports = function (app) {
    var renderPageWithUser = function (req, res) {
        if (!req.user) {
            return res.render('index');
        }

        res.render('index', {
            user: JSON.stringify(_.pick(req.user.values, 'id', 'username', 'createdAt', 'updatedAt'))
        });
    };

    var appPages = [
        '/',
        '/login',
        '/register',
        '/user',
        '/parties',
        '/parties/*',
        '/party/*',
        '/horses',
        '/horse/*'
    ];

    _.each(appPages, function (appPage) {
        app.get(appPage, renderPageWithUser);
    });
};