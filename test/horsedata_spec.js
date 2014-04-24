/* global describe, beforeEach, afterEach, it */

var fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	should = require('should'),
	Promise = require('bluebird'),
	sinon = require('sinon'),
	HorseDataScraper = require('../server/horsedata'),
	HorseData = HorseDataScraper.HorseData;

var horseDataHtml = fs.readFileSync(path.join(__dirname, 'res', 'horsesdata.html')).toString(),
	californiaChromeHtml = fs.readFileSync(path.join(__dirname, 'res', 'californiachrome.html')).toString();

describe('HorseDataScraper', function () {

	var sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('can scrape horses list', function (done) {
		var scraper = new HorseDataScraper();

		sandbox.stub(scraper, '_getHorsesHtml').returns(Promise.resolve(horseDataHtml));
		
		scraper.getHorses().then(function (horses) {
			should.exist(horses);

			horses.length.should.equal(26);

			horses[0].name.should.equal('California Chrome');
			horses[0].rank.should.equal(1);
			horses[0].points.should.equal(150);

			done();
		}).catch(done);
	});

	describe('HorseData', function () {
		it('can load individual horse data', function (done) {
			var horse = new HorseData({
				url: 'somesite.com/horses/testhorse'
			});

			sandbox.stub(horse, '_getHorseHtml').returns(Promise.resolve(californiaChromeHtml));

			horse.getData().then(function (updatedHorse) {
				should.exist(updatedHorse);

				should.exist(updatedHorse.pedigreeText);
	            should.exist(updatedHorse.pedigreeLink);
	            should.exist(updatedHorse.pastPerformanceLink);
	            should.exist(updatedHorse.silkColor);
	            should.exist(updatedHorse.silkSymbol);
	            should.exist(updatedHorse.silkJersey);

				done();
			}).catch(done);
		});
	});
});