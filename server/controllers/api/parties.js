var _ = require('lodash'),
    auth = require('../../middleware/auth'),
    params = require('../../middleware/params'),
    Models = require('../../models'),
    Horse = Models.Horse,
    Party = Models.Party,
    Bid = Models.Bid;

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

    app.post('/', auth.ensureAuthenticated(), function (req, res) {
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

    app.put('/', auth.ensureAuthenticated(), function (req, res) {
        var partyData = _.pick(req.body.party, 'id', 'title', 'slug');

        // TODO: Check for user id matching party owner

        if (!partyData.id || !_.isNumber(partyData.id)) {
            return res.send(400, 'No id defined or not formatted correctly');
        }

        Party.find(partyData.id)
            .success(function (found) {
                if (!found) {
                    return res.send(404, 'Party not found with id: ' + partyData.id);
                }

                found.updateAttributes(partyData, ['title', 'slug'])
                    .success(function (updated) {
                        res.json({
                            party: updated
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

    app.param('partyId', params.partyId);

    app.get('/:partyId', function (req, res) {
        res.json({ party: req.party.values });
    });

    app['delete']('/:partyId', auth.ensureAuthenticated(), function (req, res) {
        if (req.party.UserId !== req.user.id) {
            return res.send(403, 'Unable to delete another owners party');
        }

        req.party.destroy()
            .success(function () {
                res.send(204);
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.get('/:partyId/bids', function (req, res) {
        req.party.getBids()
            .success(function (foundBids) {
                res.json({ bids: _.pluck(foundBids, 'values') });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.get('/:partyId/bids/:bidId', function (req, res) {
        var bidId = parseInt(req.param('bidId'), 10);

        if (isNaN(bidId)) {
            return res.send(400, 'Invalid bidId: ' + bidId);
        }

        req.party.getBids({ where: { id: bidId }})
            .success(function (foundBids) {
                if (!foundBids || foundBids.length < 1) {
                    return res.send(404, 'Not found');
                }

                res.json({ bid: foundBids[0].values });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.post('/:partyId/bids', auth.ensureAuthenticated(), function (req, res) {
        var bidData = req.body.bid;

        var bid = Bid.build(bidData);

        // TODO: Validate?

        bid.save()
            .success(function (savedBid) {
                res.json({ bid: savedBid.values });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.put('/:partyId/bids/:bidId', auth.ensureAuthenticated(), function (req, res) {
        var bidId = parseInt(req.param('bidId'), 10);

        if (isNaN(bidId)) {
            return res.send(400, 'Invalid bidId: ' + bidId);
        }

        req.party.getBids({ where: { id: bidId }})
            .success(function (foundBids) {
                if (!foundBids || foundBids.length < 1) {
                    return res.send(404, 'Not found');
                }

                var bid = foundBids[0];

                bid.updateAttributes(req.body.bid)
                    .success(function (updatedBid) {
                        res.json({ bid: updatedBid.values });
                    })
                    .error(function (err) {
                        res.send(500, err.message);
                    });
            });
    });

    app['delete']('/:partyId/bids/:bidId', auth.ensureAuthenticated(), function (req, res) {
        var bidId = parseInt(req.param('bidId'), 10);

        if (isNaN(bidId)) {
            return res.send(400, 'Invalid bidId: ' + bidId);
        }

        req.party.getBids({ where: { id: bidId }})
            .success(function (foundBids) {
                    if (!foundBids || foundBids.length < 1) {
                        return res.send(404, 'Not found');
                    }

                    var bid = foundBids[0];

                    bid.destroy()
                        .success(function () {
                            res.send(204);
                        })
                        .error(function (err) {
                            res.send(500, err.message);
                        });
                });
    });
};
