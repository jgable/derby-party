
module.exports = {
	ensureAuthenticated: function (ref) {
		ref = ref || 'api';

		return function (req, res, next) {
			if (req.isAuthenticated()) {
				return next();
			}

			if (ref === 'api') {
				return res.send(401, 'Unauthorized');
			}

			res.redirect('/login?ref=' + ref);
		};
	}
};