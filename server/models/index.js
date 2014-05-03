// These are all defined in one file because of the circular references to each other.

var Sequelize = require('sequelize'),
    sequelize = require('./db').instance,
    Promise = require('bluebird'),
    HorseDataScraper = require('../horsedata'),
    passportLocalSequelize = require('passport-local-sequelize');

// Setup the models
var User = passportLocalSequelize.defineUser(sequelize, {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [6, 128],
                msg: 'Username must be between 6 and 128 characters in length'
            },
            isEmail: {
                msg: 'Email address must be valid'
            }
        },
    }
});

var Party = sequelize.define('Party', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [3, 128],
                msg: 'Title must be between 3 and 128 characters in length'
            },
        }
    },
    slug: {
        type: Sequelize.STRING,
        unique: true
    }
});

var Guest = sequelize.define('Guest', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});

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
}, {
    classMethods: {
        ScrapeData: function () {
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
        }
    }
});

var Bid = sequelize.define('Bid', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
    }
});

// Setup the relations
User.hasMany(Party, { as: 'parties' });

Guest.hasMany(Bid, { as: 'bids' });

Party.hasOne(User, { as: 'owner' })
     .hasMany(Guest, { as: 'guests' })
     .hasMany(Bid, { as: 'bids' });

Horse.hasMany(Bid, { as: 'bids' });

module.exports = {
    User: User,
    Party: Party,
    Guest: Guest,
    Horse: Horse,
    Bid: Bid
};