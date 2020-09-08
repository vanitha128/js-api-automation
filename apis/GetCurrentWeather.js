const { RequestPromise } = require('../support/RequestPromise');

const GetCurrentWeather = testData =>
    new Promise((resolve, reject) => {

        var options = {
            method: 'GET',
            uri: testData,
            time: true,
            resolveWithFullResponse: true,
            simple: false
        };


        RequestPromise(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (err) {
                reject(err);
                console.log("Failed in GetWeatherbitCurrent: " + err);
            });
    });

module.exports = { GetCurrentWeather };