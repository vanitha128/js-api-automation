const { RequestPromise } = require('../support/RequestPromise');

const GetBooks = mockData =>
    new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            uri: mockData,
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
                console.log("Failed in GetBooks: " + err);
            });
    });
module.exports = { GetBooks };
