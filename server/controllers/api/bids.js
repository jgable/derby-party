
var _ = require('lodash'),
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
};