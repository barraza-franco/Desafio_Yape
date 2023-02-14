import { ChainablePromiseElement } from 'webdriverio';

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get fromDropdown() {
        return $("//select[@id='Filtros_Ida_Origen']/optgroup");
    }

    public get toDropdown() {
        return $("//select[@id='Filtros_Ida_Destino']/optgroup");
    }

    public get trainDropdown() {
        return $("#cbTrenSelect");
    }

    public get oneWayOption() {
        return $("//label[@for='oneway']/span");
    }

    public get roundTripOption() {
        return $("//label[@for='roundtrip']/span");
    }

    //Seleccionar cantidad de pasajeros
    public get countParentsChildrenField() {
        return $("#countParentsChildren");
    }
    public get adultsCount(){
        return $("#Filtros_Adultos_Total");
    }
    public get childrenCount(){
        return $("#Filtros_Ninno_Total");
    }
    public get removeAdult(){
        return $("#btnRemoveAdult")
    }
    public get addAdult(){
        return $("#btnAddAdult")
    }
    public get removeChild(){
        return $("#btnRemoveChild")
    }
    public get addChild(){
        return $("#btnAddChild")
    }
    public get closePassengers(){
        return $("//*[@class='cerrar-passanger']")
    }

    //Seleccionar en calendario
    public get datePickerCalendarFrom() {
        return $("#Filtros_Ida_Fecha");
    }
    public get datePickerCalendarTo() {
        return $("#Filtros_Retorno_Fecha");
    }
    public get monthDatePicker() {
        return $("//span[@class='ui-datepicker-month']");
    }
    public get yearDatePicker() {
        return $("//span[@class='ui-datepicker-year']");
    }
    public get prevIcon() {
        return $("//span[@class='ui-icon ui-icon-circle-triangle-w']");
    }
    public get nextIcon() {
        return $("//span[@class='ui-icon ui-icon-circle-triangle-e']");
    }
    public selectDay = (day: number) => $(`//*[@id='ui-datepicker-div']//table//td[@data-handler='selectDay']/a[text()='${day}']`);

    public get searchButton() {
        return $('#btn_search');
    }

    public async validatePage(): Promise<boolean> {
        return (await this.searchButton).isClickable();
    }

    public async setTypeTrip(type: string) {
        if (type == 'roundtrip') {
            (await this.roundTripOption).click();
        }
        if (type == 'oneway') {
            (await this.oneWayOption).click();
        }
    }

    public async setDestination(destination: string, route: string) {
        await (await this.fromDropdown).selectByVisibleText(destination);
        await (await this.toDropdown).selectByVisibleText(route);
    }

    private async getAdultsCount() {
        const adultsCount = await this.adultsCount.getValue();
        return Number(adultsCount);
    }

    private async getChildrenCount() {
        const childrenCount = await this.childrenCount.getValue();
        return Number(childrenCount);
    }

    public async setNumberOfPassengers(adults: number, children: number) {
        this.countParentsChildrenField.waitForClickable();
        this.countParentsChildrenField.click();

        while (await this.getAdultsCount() !== adults) {
            if (await this.getAdultsCount() > adults) {
                await this.removeAdult.waitForClickable();
                await this.removeAdult.click();
            } else if (await this.getAdultsCount() < adults) {
                await this.addAdult.waitForClickable();
                await this.addAdult.click();
            }
        }

        while (await this.getChildrenCount() !== children) {
            if (await this.getChildrenCount() > children) {
                await this.removeChild.waitForClickable();
                await this.removeChild.click();
            } else if (await this.getChildrenCount() < children) {
                await this.addChild.waitForClickable();
                await this.addChild.click();
            }
        }

        await this.closePassengers.click();
    }

    private async getActualDateValue() {
        const actualMonth = await this.monthDatePicker.getText();
        const actualYear = await this.yearDatePicker.getText();
        const actualMonthInNumber = new Date(`${actualMonth}, 2012`).getMonth() + 1;
        const actualYearInNumber = Number(actualYear);
        const actualDateValue = new Date(actualYearInNumber, actualMonthInNumber).valueOf();
        return actualDateValue;
    }

    private getExpectedDateValue(month: string, year: number) {
        const expectedMonthInNumber = new Date(`${month}, 2012`).getMonth() + 1;
        const expectedDateValue = new Date(year, expectedMonthInNumber).valueOf();
        return expectedDateValue;
    }

    private async navigateToMatchingDateGrid(month: string, year: number) {
        while (await this.getActualDateValue() !== this.getExpectedDateValue(month, year)) {
            if (await this.getActualDateValue() > this.getExpectedDateValue(month, year)) {
                await this.prevIcon.waitForClickable();
                await this.prevIcon.click();
            } else if (await this.getActualDateValue() < this.getExpectedDateValue(month, year)) {
                await this.nextIcon.waitForClickable();
                await this.nextIcon.click();
            }
        }
    }

    public async setDate(date: string, day: number, month: string, year: number) {
        if (date === 'from') {
            await this.datePickerCalendarFrom.waitForClickable();
            await this.datePickerCalendarFrom.click();
        } else if (date === 'to') {
            await this.datePickerCalendarTo.waitForClickable();
            await this.datePickerCalendarTo.click();
        }

        await this.navigateToMatchingDateGrid(month, year)
        await this.selectDay(day).click();
        await browser.pause(1000)
    }

    public async clickSearch() {
        (await this.searchButton).click();
    }

    public open() {
        return super.open('');
    }


}

export default new HomePage();
