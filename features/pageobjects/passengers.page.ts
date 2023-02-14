class PassengersPage {

    public get continueButton(){
        return $("#btnSiguienteReserva");
    }

    public get firstNameField () {
        return $("#item_NombrePax_1");
    }

    public get surnameField () {
        return $("#item_ApellidoPax_1");
    }

    public genderOption = (gender: string, passangernumber: number) => $(`(//*[text()='${gender}']/following-sibling::span)[${passangernumber}]`);

    public get nationalityDropdown () {
        return $("#select2-item_NacionalidadPax_1-container");
    }

    public get dropdownSearchField () {
        return $("//input[@class='select2-search__field']");
    }

    public get typeOfDocumentDropdown () {
        return $("#select2-item_TipoDocumento_1-container");
    }

    public get documentNumberField () {
        return $("#item_NroDocumentoPax_1");
    }

    public get telephoneNumberField () {
        return $("#item_TelefonoPax_1");
    }

    public get emailField () {
        return $("#item_EmailPax_1");
    }

    public get emailConfirmationField () {
        return $("#item_EmailPax_Confirm_1");
    }

    //Seleccionar fecha de nacimiento
    public get dateOfBirthDate () {
        return $("#item_NacimientoPax_1");
    }
    public get monthAndYearDatePicker() {
        return $("(//*[@class='datepicker-switch'])[1]");
    }
    public get prevIcon() {
        return $("(//th[@class='prev'])[1]");
    }
    public selectDay = (day: number) => $(`//*[@class='datepicker-days']//table//tr//td[@class='day'][text()='${day}']`);

    public async validatePage(): Promise<boolean> {
        return (await this.continueButton).isClickable()
            && (await this.firstNameField).isEnabled()
            && (await this.surnameField).isEnabled();
    }
    public async clickContinue(){
        await this.continueButton.click();
    }

    public async setPassengerName(name: string, surname: string, gender: string) {
        await this.firstNameField.addValue(name);
        await this.surnameField.addValue(surname);
        await this.genderOption(gender, 1);
    }

    public async setPassengerNationality(nationality: string, typeofdocument:string, documentnumber: string){
        await this.nationalityDropdown.click();
        await this.dropdownSearchField.addValue(nationality);
        await browser.keys("\uE007")

        await this.typeOfDocumentDropdown.click();
        await this.dropdownSearchField.addValue(typeofdocument);
        await browser.keys("\uE007")

        await this.documentNumberField.addValue(documentnumber);
    }

    public async setPassengerDateBirth(day: number, month: string, year: number){
        await this.dateOfBirthDate.waitForClickable();
        await this.dateOfBirthDate.click();

        await this.navigateToMatchingDateGrid(month, year)
        await this.selectDay(day).click();
    }

    private async getActualDateValue() {
        const actualMonthAndYear = await (await this.monthAndYearDatePicker.getText()).split(' ');
        const actualMonth = actualMonthAndYear[0];
        const actualYear = actualMonthAndYear[1];
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
            } 
        }
    }

    public async setPassengerContactData(telephone: string, email: string){
        await this.telephoneNumberField.addValue(telephone);
        await this.emailField.addValue(email);
        await this.emailConfirmationField.addValue(email);
    }
}

export default new PassengersPage();