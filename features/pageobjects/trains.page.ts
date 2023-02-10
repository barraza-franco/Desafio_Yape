import { ChainablePromiseElement } from 'webdriverio';

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TrainsPage {
    /**
     * define selectors using getter methods
     */
    public get continueButton () {
        return $("//select[@id='Filtros_Ida_Origen']/optgroup");
    }

    public async validatePage(): Promise<boolean>{
        return (await this.continueButton).isClickable();
    }

    public async clickContinue(){
        await (await this.continueButton).click();
    }

}

export default new TrainsPage();