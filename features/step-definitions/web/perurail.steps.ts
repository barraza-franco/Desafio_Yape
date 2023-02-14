import { Given, When, DataTable, Then } from '@wdio/cucumber-framework';

import HomePage from '../../pageobjects/home.page.js';
import PassengersPage from '../../pageobjects/passengers.page.js';
import TrainsPage from '../../pageobjects/trains.page.js';
import ConfirmationPaymentPage from '../../pageobjects/confirmationpayment.page.js';
const pages = {
    home: HomePage
}

let firstPrice;
let subTotalPrice;

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
    await driver.maximizeWindow();
    expect(await HomePage.validatePage());
});

When(/^I set the type of trip (.+)$/, async (type) => {
    await HomePage.setTypeTrip(type);
});

When(/^I search the destination with the following data$/, async (table: DataTable) => {
    let dt = table.rows()[0]
    await HomePage.setDestination(dt[0], dt[1])
    await browser.pause(1000)

    let dateFrom = dt[2].split('/')

    await HomePage.setDate('from', Number(dateFrom[0]), dateFrom[1], Number(dateFrom[2]))

    if (dt[3] !== '') {
        let dateTo = dt[3].split('/')
        await HomePage.setDate('to', Number(dateTo[0]), dateTo[1], Number(dateTo[2]))
    }

    await HomePage.setNumberOfPassengers(Number(dt[4]), Number(dt[5]));

    await HomePage.clickSearch();
});

When(/^I do switch to the new page$/, async () => {
    await browser.switchWindow('book.perurail.com');
    await browser.waitUntil(async () => (await TrainsPage.validatePage()), { timeout: 30000 })
});

When(/^I set the passanger data with the following data$/, async (table: DataTable) => {
    let dt = table.rows()[0]
    await PassengersPage.setPassengerName(dt[0], dt[1], dt[2])
    await PassengersPage.setPassengerNationality(dt[3], dt[4], dt[5])

    let dateOfBirth = dt[6].split('/')
    await PassengersPage.setPassengerDateBirth(Number(dateOfBirth[0]), dateOfBirth[1], Number(dateOfBirth[2]))

    await PassengersPage.setPassengerContactData(dt[7], dt[8])
    await PassengersPage.clickContinue();
});

When(/^I should be on the step (.+)$/, async (step) => {
    if (step === "2") {
        expect(await TrainsPage.validatePage());
    } else if (step === "3") {
        expect(await PassengersPage.validatePage());
    } else if (step === "4") {
        expect(await ConfirmationPaymentPage.validatePage());
    }
});

When(/^I choose the first option of trains$/, async () => {
    await TrainsPage.clickOutBoundJourneyFirstOption();
    firstPrice = await TrainsPage.getTotalPrice();
    await TrainsPage.clickContinue();
});

When(/^I select type of payment (.+)$/, async (payment) => {
    await ConfirmationPaymentPage.selectPayment(payment);
    await ConfirmationPaymentPage.AcceptTermsAndConditions();

    subTotalPrice = await ConfirmationPaymentPage.getSubTotalPrice();

    await ConfirmationPaymentPage.clickContinue();
});

Then(/^The first price, the subtotal price and the finish price its the same$/, async () => {
    let finishPrice = await ConfirmationPaymentPage.getTotalPrice();

    expect(finishPrice).toEqual(firstPrice)
    expect(finishPrice).toEqual(subTotalPrice)
});