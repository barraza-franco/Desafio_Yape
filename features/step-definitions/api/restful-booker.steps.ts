import { Given, When, Then } from "@wdio/cucumber-framework";
import axios from "axios";

let token;
let baseUrl;
let response;
var headers = {
    'Content-Type': 'application/json'
}

Given(/^I set base url '(.+)'$/, async (url) => {
    baseUrl = url;
});

Given(/^I set path '(.+)'$/, async (path) => {
    baseUrl += path;
});

When(/^I do GET$/, async () => {
    response = await axios.get(baseUrl, { headers: headers }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I do Post$/, async (body) => {
    response = await axios.post(baseUrl, JSON.parse(body), { headers: headers }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I save token$/, async () => {
    token = response.data.token;
    console.log("The token is: "+ token)
});

Then(/^I validate status (.+)$/, async (status) => {
    console.log("The response body is: ")
    console.log(response.data)
    expect(await response.status.toString()).toBe(status)
});