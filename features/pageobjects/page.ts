export default class Page {

    public open (path: string) {
        return browser.url(`https://www.perurail.com/${path}`)
    }
}
