var _ = require('lodash'),
    params = require('../../middleware/params'),
    Models = require('../../models'),
    Horse = Models.Horse,
    Party = Models.Party;

module.exports = function (app) {
    app.get('/', function (req, res) {
        Party
            .findAll()
            .success(function (parties) {
                res.json({ parties: _.pluck(parties, 'values') });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.param('partyId', params.partyId);

    app.get('/:partyId', function (req, res) {
        res.json({ party: req.party.values });
    });

    app.get('/:partyId/horses', function (req, res) {
        // For right now, this just returns all horses; no party only horses
        Horse
            .findAll()
            .success(function (horses) {
                res.json({ horses: _.pluck(horses, 'values') });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    // For right now this is just loading the horse details, it should load bet information
    app.param('horseId', params.horseId);

    app.get('/:partyId/horses/:horseId', function (req, res) {
        res.json({ horse: req.horse.values });
    });
};
