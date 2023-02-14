class ConfirmationPaymentPage {

    public get subTotalPrice() {
        return $("(//span[@class='clsTotalDol'])[1]")
    }

    public get totalPrice() {
        return $("//span[@class='amount pull-right']")
    }

    public get continueButton() {
        return $("#btnSiguientePago");
    }

    public get termsAndConditionsButton() {
        return $("//*[@id='accept-term']/following-sibling::span");
    }

    public get acceptBimodalButton() {
        return $("//*[@id='accept-bimodal']/following-sibling::span");
    }

    public paymentOption = (option: string) => $(`//label[@id='label-globalCollect-${option}']`);

    public async validatePage(): Promise<boolean> {
        return (await this.continueButton).isClickable()
            && (await this.termsAndConditionsButton).isEnabled();
    }

    public async AcceptTermsAndConditions() {
        await this.termsAndConditionsButton.waitForClickable();
        await this.termsAndConditionsButton.click();

        await this.acceptBimodalButton.waitForClickable();
        await this.acceptBimodalButton.click();
    }

    public async clickContinue() {
        await this.continueButton.click();
    }

    public async getSubTotalPrice(): Promise<number> {
        let totalPrice = await this.subTotalPrice.getText();
        return Number(totalPrice);
    }

    public async selectPayment(payment: string) {
        await (await this.paymentOption(payment)).waitForEnabled();
        await this.paymentOption(payment).click();
    }

    public async getTotalPrice(): Promise<number> {
        let totalPrice = await this.subTotalPrice.getText();
        return Number(totalPrice);
    }

}

export default new ConfirmationPaymentPage();