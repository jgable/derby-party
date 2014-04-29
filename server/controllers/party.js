module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('index');
	});
	app.get('/:partyId', function (req, res) {
		res.render('index');
	});
};