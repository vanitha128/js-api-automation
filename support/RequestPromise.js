const requestPromise = require('request-promise');

const RequestPromise = (options) =>
    new Promise((resolve, reject) => {
        requestPromise(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (err) {
                reject(err);
            });
    });

module.exports = { RequestPromise };
