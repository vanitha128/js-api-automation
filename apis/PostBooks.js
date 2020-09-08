const { RequestPromise } = require('../support/RequestPromise');

const PostBooks = (mockData, name, author) =>
    new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            uri: mockData,
            time: true,
            resolveWithFullResponse: true,
            simple: false,
            body: {
                name: name,
                author: author
            },
            json: true
        };
        RequestPromise(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (err) {
                reject(err);
                console.log("Failed in PostBooks: " + err);
            });
    });
module.exports = { PostBooks };
