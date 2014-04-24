
var Promise = require('bluebird'),
    Sequelize = require('sequelize'),
    sequelize = require('./db').instance,
    HorseDataScraper = require('../horsedata');

var Horse = sequelize.define('Horse', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    headshotImage: {
        type: Sequelize.STRING
    },
    silkThumb: {
        type: Sequelize.STRING
    },
    rank: {
        type: Sequelize.INTEGER
    },
    earnings: {
        type: Sequelize.INTEGER
    },
    points: {
        type: Sequelize.INTEGER
    },
    pedigreeText: {
        type: Sequelize.STRING
    },
    pedigreeLink: {
        type: Sequelize.STRING
    },
    pastPerformanceLink: {
        type: Sequelize.STRING
    },
    silkColor: {
        type: Sequelize.STRING
    },
    silkSymbol: {
        type: Sequelize.STRING
    },
    silkJersey: {
        type: Sequelize.STRING
    }
});

Horse.ScrapeData = function () {
    var scraper = new HorseDataScraper();

    return new Promise(function (resolve, reject) {
            Horse.findAll()
                .success(function (found) {
                    if (found.length > 0) {
                        return reject(new Error('Data already loaded'));
                    }

                    resolve();
                })
                .error(function (err) {
                    reject(err);
                });
        })
        .then(function () {
            return scraper
                .getData()
                .then(function (horses) {
                    return new Promise(function (resolve, reject) {
                        Horse.bulkCreate(horses)
                            .success(function () {
                                Horse.findAll().success(resolve).error(reject);
                            })
                            .error(reject);
                    });
                });
        });
};

Horse.sync();

module.exports = Horse;