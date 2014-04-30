
var Models = require('../models'),
    Horse = Models.Horse,
	Party = Models.Party;

module.exports = {
	horseId: function (req, res, next, horseId) {
        // TODO: Handle slug or id

        var id = parseInt(horseId, 10);

        if (isNaN(id)) {
            return res.send(403, 'Not found');
        }

        Horse.find(id)
            .success(function (found) {
                if (!found) {
                    return res.send(403, 'Not found');
                }

                req.horse = found;
                next();
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    },

    partyId: function (req, res, next, partyId) {
        // TODO: Handle slug or id

        var id = parseInt(partyId, 10);

        if (isNaN(id)) {
            return res.send(403, 'Not found');
        }

        Party.find(id)
            .success(function (found) {
                if (!found) {
                    return res.send(403, 'Not found');
                }

                req.party = found;
                next();
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    }
};