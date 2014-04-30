
var _ = require('lodash'),
    params = require('../../middleware/params'),
    Horse = require('../../models').Horse;

module.exports = function (app) {
    app.get('/', function (req, res) {
        Horse
            .findAll()
            .success(function (horses) {
                res.json({ horses: _.pluck(horses, 'values') });
            })
            .error(function (err) {
                res.send(500, err.message);
            });
    });

    app.get('/scrapeem', function (req, res) {
        Horse
            .ScrapeData()
            .then(function (horses) {
                res.json({ horses: _.pluck(horses, 'values') });
            })
            .catch(function (err) {
                res.send(500, err.message);
            });
    });

    app.param('horseId', params.horseId);

    app.get('/:horseId', function (req, res) {
        res.json({ horse: req.horse.values });
    });
};