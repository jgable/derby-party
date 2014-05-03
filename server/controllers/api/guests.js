
var _ = require('lodash'),
    Guest = require('../../models').Guest,
    auth = require('../../middleware/auth');

module.exports = function (app) {
    app.get('/', function (req, res) {
        Guest
            .findAll()
            .success(function (guests) {
                res.json({ guests: _.pluck(guests, 'values') });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.post('/', function (req, res) {        
        var name = req.body.guest.name,
            partyId = req.body.guest.party;

        Guest.create({ name: name, PartyId: partyId })
            .success(function (createdGuest) {
                res.json({
                    guest: createdGuest
                });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app['delete']('/:guestId', auth.ensureAuthenticated(), function (req, res) {
        Guest.find(req.param('guestId'))
            .success(function (found) {
                if (!found) {
                    return res.send(401);
                }

                found.destroy()
                    .success(function (req, res) {
                        res.send(204);
                    })
                    .error(function (err) {
                        res.send(500, err.message);
                    });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });
};