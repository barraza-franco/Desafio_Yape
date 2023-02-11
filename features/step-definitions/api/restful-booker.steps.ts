import { Given, When, Then } from "@wdio/cucumber-framework";
import axios from "axios";

let token;
let baseUrl;
let response;
let requestBody;
let bookingId;
let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

Given(/^I set base url '(.+)'$/, async (url) => {
    baseUrl = url;
});

Given(/^I set path '(.+)'$/, async (path: string) => {
    baseUrl = baseUrl + "/" + path;
});

Given(/^I set id stored$/, async () => {
    baseUrl = baseUrl + "/" + bookingId;
});

When(/^I do GET$/, async () => {
    response = await axios.get(baseUrl, { headers: headers}).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I do Post$/, async (body) => {
    requestBody = JSON.parse(body)
    response = await axios.post(baseUrl, requestBody, { headers: headers }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I do Put$/, async (body) => {
    requestBody = JSON.parse(body)

    response = await axios.put(baseUrl, 
                               requestBody, 
                             { headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Cookie': 'token='+token
    }}).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I do DELETE$/, async () => {
    response = await axios.delete(baseUrl, { headers: {
                                'Content-Type': 'application/json',
                                'Cookie': 'token='+token
    }}).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });
});

When(/^I save token$/, async () => {
    token = response.data.token;
    console.log("The token is: "+ token)
    expect(await token!='').toBe(true)
});

When(/^I save the first booking id$/, async () => {
    bookingId = response.data[0].bookingid;
    console.log("The first booking id is: "+ bookingId)
    expect(await bookingId!='').toBe(true)
});

Then(/^I validate status (.+)$/, async (status) => {
    console.log("The response body is: ")
    console.log(response.data)
    // expect(await response.data!='').toBe(true)
    expect(await response.status.toString()).toBe(status)
});

Then(/^I validate the body has keys$/, async (body) => {
    let jsonbody = JSON.parse(body)

    for(let key in jsonbody){
        expect(await response.data.hasOwnProperty(key)).toBe(true)
    }
});

Then(/^I validate the (.+) response body$/, async (method: string) => {
    if(method=='Post'){
        expect(await response.data.booking).toStrictEqual(requestBody)
    }else if(method=='Put'){
        expect(await response.data).toStrictEqual(requestBody)
    }
    
});

Then(/^I save the id booking created$/, async () => {
    bookingId = response.data.bookingid;
    console.log("The id created is: "+ bookingId)
    expect(await bookingId!='').toBe(true)
});

Then(/^The booking was delete$/, async () => {
    response = await axios.get(baseUrl, { headers: headers}).then(function (response) {
        return response;
    }).catch(function (response) {
        return response.response;
    });

    expect(await response.data).toBe('Not Found')
    expect(await response.status).toBe(404)
});