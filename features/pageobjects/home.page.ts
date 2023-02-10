import { ChainablePromiseElement } from 'webdriverio';

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get fromDropdown () {
        return $("//select[@id='Filtros_Ida_Origen']/optgroup");
    }

    public get toDropdown () {
        return $("//select[@id='Filtros_Ida_Destino']/optgroup");
    }

    public get trainDropdown () {
        return $("#cbTrenSelect");
    }

    public get oneWayOption () {
        return $("//label[@for='oneway']/span");
    }

    public get roundTripOption () {
        return $("//label[@for='roundtrip']/span");
    }
    
    // public get fromDate () {
    //     return $("#Filtros_Ida_Fecha");
    // }

    // public get toDate () {
    //     return $("#Filtros_Retorno_Fecha");
    // }
    
    public get searchButton () {
        return $('#btn_search');
    }

    public async validatePage(): Promise<boolean>{
        return (await this.searchButton).isClickable();
    }

    public async setTypeTrip(type:string){
        if(type=='roundtrip'){
            (await this.roundTripOption).click();
        }
        if(type=='oneway'){
            (await this.oneWayOption).click();
        }
    }

    public async setDestination (destination: string, route: string) {
        await (await this.fromDropdown).selectByVisibleText(destination);
        await (await this.toDropdown).selectByVisibleText(route);
        // if(train!==""){
        //     await (await this.trainDropdown).selectByVisibleText(train);
        // }
    }

    // public async setDate(fromDate: string){
    //     await (await this.fromDate).addValue('21/02/2023');
    // }

    public async clickSearch(){
        (await this.searchButton).click();
    }

    public open () {
        return super.open('');
    }


}

export default new HomePage();
