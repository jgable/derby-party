
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
		.put(function (req, res) {
			var partyData = _.pick(req.body, 'id', 'title', 'slug');

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
		})
		.post(function (req, res) {
			var newParty = Party.build({
				UserId: req.user.id,
				title: req.param('title')
			});

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
