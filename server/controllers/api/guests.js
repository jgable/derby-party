
var Guest = require('../../models').Guest,
    auth = require('../../middleware/auth');

module.exports = function (app) {
    app.post('/', function (req, res) {
        var name = req.param('name'),
            partyId = req.param('PartyId');

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