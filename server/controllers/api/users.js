
var _ = require('lodash');

var authMiddleware = require('../../middleware/auth'),
    Party = require('../../models').Party;

module.exports = function (app) {
    app.use(authMiddleware.ensureAuthenticated());

    app.get('/me', function (req, res) {
        res.json({
            user: _.pick(req.user.values, 'id', 'username', 'createdAt', 'updatedAt')
        });
    });

    app.get('/testparty', function (req, res) {
        Party.create({
                title: 'Test Party',
                slug: 'test-party'
            })
            .success(function (createdParty) {
                req.user.addParty(createdParty)
                    .success(function () {
                        res.json({
                            party: createdParty.values
                        });
                    })
                    .error(function (err) {
                        res.send(500, err.message);
                    });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.route('/parties')
        .get(function (req, res) {
            req.user.getParties()
                .success(function (parties) {
                    res.json({
                        parties: _.pluck(parties, 'values')
                    });
                })
                .error(function (err) {
                    res.send(500, err.message);
                });
        })
        .post(function (req, res) {
            var newParty = Party.build(_.extend(req.param('party'), {
                UserId: req.user.id
            }));

            // TODO: Validate?

            newParty.save()
                .success(function (createdParty) {
                    res.json({
                        party: createdParty
                    });
                })
                .error(function (err) {
                    res.send(500, err.message);
                });
        });
};
