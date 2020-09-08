const expect = require("chai").expect;
const { GetCurrentWeather } = require("../apis/GetCurrentWeather");
const weatherData = require('../data/testData.json');
var data_driven = require('mocha-data-driven');
const today = new Date();

describe('Getting the current weather conditions', function () {
    this.timeout(30000);
    data_driven(weatherData.Current, function () {
        describe('Given I want to return the current weather condition And {Lat} and {Lon} When I navigate to current weather API', function (ctx) {
            it('Then I should receive the correct payload and information', async function (ctx) {
                testURL = ctx.BaseURL + 'current/?lat=' + ctx.Lat + '&lon=' + ctx.Lon + '&key=' + ctx.ApiKey;
                currentResponse = await GetCurrentWeather(testURL);
                console.log('test url ' + testURL);
                console.log('current response:' + currentResponse);
                console.log('currentResponse.statusCode ' + currentResponse.statusCode);
                console.log('ctx.expectedResponseCode ' + ctx.ExpectedResponseCode);
                expect(currentResponse.statusCode.toString()).to.equal(ctx.ExpectedResponseCode.toString());
                if (currentResponse.statusCode.toString() == "200") {
                    currentResponseBody = JSON.parse(currentResponse.body);

                    expect(currentResponseBody.data).to.be.an('array');

                    expect(currentResponseBody.data[0].sunrise).not.be.null;

                    // console.log("ctx.ExpectedSunset[12] " + ctx.ExpectedSunset[today.getDate()]);
                    //TODO:  sunrise sunset validation data is currently available for august 2020 in inputData.json file calculated based on Earth system Research lab solar calculation formula.
                    // TODO:: As a future enhancement, this formula calculation can be written as business logic to derive expected values.
                    expect(currentResponseBody.data[0].sunrise).to.equal(ctx.ExpectedSunrise[today.getDate()]);

                    expect(currentResponseBody.data[0].sunset).to.equal(ctx.ExpectedSunset[today.getDate()]);

                    expect(currentResponseBody.data[0]).to.include.any.keys('state_code');

                    expect(currentResponseBody.data[0].state_code).not.to.be.null;
                }
            });
        });
    });
});