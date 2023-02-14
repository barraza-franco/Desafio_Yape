class TrainsPage {
   
    public get peruRailLogo() {
        return $("//div[@id='logo-perurail']");
    }

    public get continueButton() {
        return $("#btnSiguiente_trenes");
    }

    public get outBoundJourneyFirstOption() {
        return $("(//table[@id='Table_servicio_ida']/*/tr)[3]/td[5]/span");
    }

    public get inBoundJourneyFirstOption() {
        return $("(//table[@id='Table_servicio_retorno']/*/tr)[3]");
    }

    public get totalPrice() {
        return $("//span[@id='liPrecioTotalTrenes']")
    }

    public async validatePage(): Promise<boolean> {
        return await this.peruRailLogo.isDisplayed()
            && await this.outBoundJourneyFirstOption.isClickable();
    }

    public async clickOutBoundJourneyFirstOption() {
        await (await this.outBoundJourneyFirstOption).click();
    }

    public async clickContinue() {
        await (await this.continueButton).waitForClickable();
        await (await this.continueButton).click();
    }

    public async getTotalPrice(): Promise<number> {
        let totalPrice = await (await this.outBoundJourneyFirstOption.getText()).substring(4);

        return Number(totalPrice);
    }
}

export default new TrainsPage();