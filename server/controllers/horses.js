
var _ = require('lodash'),
    Horse = require('../models/horse');

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

    app.param('horseId', function (req, res, next, horseId) {
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
    });

    app.get('/:horseId', function (req, res) {
        res.json({ horse: req.horse.values });
    });
};