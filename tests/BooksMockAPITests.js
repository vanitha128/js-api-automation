const expect = require("chai").expect;
const { GetBooks } = require("../apis/GetBooks");
const { PostBooks } = require("../apis/PostBooks");
const data = require('../data/testdata-mockapi.json');
var data_driven = require('mocha-data-driven');
var sleep = require('sleep');



describe('Using mock server simulate post request', function () {
    this.timeout(30000);
    data_driven(data.books, function () {
        describe('Given I have submitted a POST request and created a new entry in the mock server When I attempt to retrieve the new record', function (ctx) {
            it('Then I should receive a response with the new record and correct payload', async function (ctx) {
                // run following command to pop the json server(mock) in localhost:
                // json-server --watch data/mock-db.json
                const testURL = 'http://localhost:3000/books';

                //post books to create new entry in mock server
                postResponse = await PostBooks(testURL, ctx.name, ctx.author);
                console.log('test url ' + testURL);
                console.log('postResponse.statusCode ' + postResponse.statusCode);
                expect(postResponse.statusCode.toString()).to.equal("201");
                // parse the post body to fetch the id of new book created
                postResponseBody = postResponse.body;
                expect(postResponseBody.id).not.be.null;
                let id = postResponseBody.id;
                console.log("id " + id);
                sleep.sleep(4);
                // call get books to retrieve the new record created
                let getTestURL = testURL + "/" + id;
                getResponse = await GetBooks(getTestURL);
                console.log('test data ' + testURL);
                console.log('getResponse.statusCode ' + getResponse.statusCode);
                expect(getResponse.statusCode.toString()).to.equal("200");

                //validate get response contains id passed from post response
                let getResponseBody = JSON.parse(getResponse.body);
                console.log(getResponseBody);
                expect(getResponseBody.id).not.be.null;
                expect(getResponseBody.id).to.equal(id);
            });
        });
    });
});