
var url = require('url'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    cheerio = require('cheerio'),
    request = Promise.promisify(require('request'));

function HorseData(vals) {
    _.extend(this, vals);
}

_.extend(HorseData.prototype, {
    getData: function () {
        var self = this;

        return this._getHorseHtml().then(function (body) {
            var $ = cheerio.load(body),
                $feature = $('#h_feature'),
                $contender = $('#contender-page'),
                $owner = $('#owner-bio');

            self.pedigreeText = $contender.find('.bris-pedigree-download a').text();
            self.pedigreeLink = $contender.find('.bris-pedigree-download a').attr('href');
            self.pastPerformanceLink = $contender.find('.pp-pdf a').attr('href');
            self.silkColor = $feature.find('.silk-art').attr('style').match(/\#(.*)$/)[0];
            self.silkSymbol = $feature.find('.silk-art').attr('style').match(/url\((.*)\)/)[1];
            self.silkJersey = $owner.find('img').attr('src');

            self.previousRaces = [];

            return self;
        });
    },

    _getHorseHtml: function () {
        return request(this.link).spread(function (req, body) {
            return body;
        });
    }
});

function HorseDataScraper(options) {
    this.options = _.defaults(options || {}, HorseDataScraper.Defaults);
}

_.extend(HorseDataScraper.prototype, {
    getData: function () {
        return this.getHorses().then(function (horses) {
            // Load all the individual horse data
            var horseLoads = horses.map(function (horse) { return horse.getData(); });
            
            return Promise.all(horseLoads);
        });
    },

    getHorses: function () {
        var rootUrl = this.options.url,
            createHorse = this._createHorseData;

        return this._getHorsesHtml().then(function (body) {
            var $ = cheerio.load(body),
                horses = [];

            $('.contender-card', '#h_main').filter(function () {
                var $card = $(this),
                    $link = $card.find('> h2 a'),
                    $stats = $card.find('.rttkd-stats'),
                    $photo = $card.find('.photo'),
                    vals = {},
                    horse;

                vals.link = $link.attr('href');
                vals.link = url.resolve(rootUrl, vals.link);
                vals.owner = $link.find('.owner').text().trim().replace(/([\t\n])+/g, ': ');
                vals.name = $link.text().trim().replace(/([\t\n])+/g, ': ').replace(': ' + vals.owner, '');
                vals.headshotImage = $photo.find('img').attr('src');
                vals.silkThumb = $link.find('img').attr('src');

                vals.rank = parseInt($stats.find('.rank div').text().trim(), 10);
                vals.earnings = parseInt($stats.find('.earnings div').text().trim(), 10);
                vals.points = parseInt($stats.find('.points div').text().trim(), 10);

                horse = createHorse(vals);

                horses.push(horse);
            });

            return horses;
        });
    },


    // These are just separated out for unit test stubbing
    _createHorseData: function (vals) {
        return new HorseData(vals);
    },

    _getHorsesHtml: function () {
        return request(url.resolve(this.options.url, '/horses')).spread(function (req, body) {
            return body;
        });
    }
});

HorseDataScraper.Defaults = {
    url: 'http://www.kentuckyderby.com'
};

HorseDataScraper.HorseData = HorseData;

module.exports = HorseDataScraper;
