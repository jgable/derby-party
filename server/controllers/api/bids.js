
var _ = require('lodash'),
	Bid = require('../../models').Bid,
	params = require('../../middleware/params');

module.exports = function (app) {

	app.param('partyId', params.partyId);

	app.get('/byparty/:partyId', function (req, res) {
		req.party.getBids()
			.success(function (foundBids) {
				res.json({ bids: _.pluck(foundBids, 'values') });
			})
			.error(function (err) {
				res.send(500, err.message);
			});
	});

	app.post('/', function (req, res) {        
        var amount = req.body.bid.amount,
            horseId = req.body.bid.horse,
            guestId = req.body.bid.guest;

        console.log(amount,horseId, guestId);


        Bid.create({ amount:amount, GuestId:guestId, HorseId:horseId })
        .success(function (createdBid) {
            res.json({
                bid: createdBid
            });
        })
        .error(function (err) {
            res.send(500, err.message);
        });
    });
};