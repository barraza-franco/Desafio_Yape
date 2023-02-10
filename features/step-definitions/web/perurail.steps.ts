import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import homePage from '../../pageobjects/home.page.js';

import HomePage from '../../pageobjects/home.page.js';
import TrainsPage from '../../pageobjects/trains.page.js';

const pages = {
    home: HomePage
}

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
    // await HomePage.setDate(dt[3])
    await HomePage.clickSearch();
    await browser.pause(5000)
    await browser.switchWindow('book.perurail.com');
});

When(/^I should be on the step two$/, async () => {
    // await driver.switchToWindow('book.perurail.com');
    // await browser.pause(6000);
    // console.log(await driver.getWindowHandle())
    // expect(await TrainsPage.validatePage());
});

When(/^I do click on continue button$/, async () => {
    await TrainsPage.clickContinue();
});