import * as manawallib from 'java-m-lib';
import { NgZone } from '@angular/core';

export class IonManaLib {

    private ngZ = new NgZone({ enableLongStackTrace: false })

    constructor() {
        console.log("IonManaLib start");
    }

    public async initPageApi(mcid: string) {
        var manaSvc = await manawallib.GetLib();
        manaSvc.initPageApi(mcid);
    }

    public async initPageApiWithCallBack(mcid: string, fn: () => void) {
        var callBack = () => { this.ngZ.run(fn) };
        var manaSvc = await manawallib.GetLib();
        manaSvc.initPageApiWithCallBack(mcid, callBack);
    }

    public async getApiData(mcid: string): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.getApiData(mcid);
    }

    public async getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.getApiDataWithEndpointId(mcid, endpointId);
    }

    public async submitFormData(mcid: string, data: any, manualClose: boolean = false) {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.submitFormData(mcid, data, manualClose);
    }

    public async submitFormDataWithEndpointId(mcid: string, data: any, manualClose: boolean, endpointId: string) {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.submitFormDataWithEndpointId(mcid, data, endpointId, manualClose);
    }

    public async callApiGet(mcid: string, url: string): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.callApiGet(mcid, url);
    }

    public async callApiPost(mcid: string, data: any): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.callApiPost(mcid, data);
    }

    public async callApiDelete(mcid: string): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.callApiDelete(mcid);
    }

    public async visitEndpoint(mcid: string, url: string) {
        var manaSvc = await manawallib.GetLib();
        manaSvc.visitEndpoint(mcid, url);
    }

    public async callTrigger(mcid: string, triggerName: string) {
        var manaSvc = await manawallib.GetLib();
        manaSvc.callTrigger(mcid, triggerName);
    }

    public async validForm(valid: boolean) {
        var manaSvc = await manawallib.GetLib();
        manaSvc.validForm(valid);
    }

    public async confirmForm(message: confirmMessage): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.confirmForm(message);
    }

    public async selectImage(mcid: string): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.selectImage(mcid);
    }

    public async setButtonVisibility(isVisible: boolean): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.setButtonVisibility(isVisible);
    };

    public async setStateChangedHandler(fn: (paeam: any) => void) {
        var callBack = (action) => { this.ngZ.run(() => { fn(action) }) };
        var manaSvc = await manawallib.GetLib();
        manaSvc.setStateChangedHandler(callBack);
    }

    public async addToolbarAction(fn: (action: any) => void) {
        var callBack = (action) => { this.ngZ.run(() => { fn(action) }) };
        var manaSvc = await manawallib.GetLib();
        manaSvc.addToolbarAction(callBack);
    }

    public async showOptionDialog(mcid: any, params: any): Promise<any> {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.showOptionDialog(mcid, params);
    }

    public async initOptionDialog(mcid: string, fn: (param: any) => any): Promise<any> {
        var callBack = (param) => { return this.ngZ.run(() => { return fn(param); }) };
        var manaSvc = await manawallib.GetLib();
        return this.retry(() => manaSvc.initOptionDialog(mcid, callBack));
    }

    public async setGpsSection(title: string, realm: string, subDistrict: string, district: string, province: string, postalCode: string, accuracy: number, latitude: number, longitude: number, phoneNumber: string, remark: string) {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.setGpsSection(title, realm, subDistrict, district, province, postalCode, accuracy, latitude, longitude, phoneNumber, remark);
    }

    public async getGpsLocation(mcid: string) {
        var manaSvc = await manawallib.GetLib();
        return manaSvc.getGpsLocation(mcid);
    }

    public getAmount(monetary: MonetaryValue): number {
        return manawallib.GetAmount(monetary);
    }

    public getCurrency(monetary: MonetaryValue): string {
        return manawallib.GetCurrency(monetary);
    }

    public getMonetaryDisplay(monetary: MonetaryValue): MonetaryValue {
        return manawallib.GetMonetaryDisplay(monetary);
    }

    private retry(fn: () => Promise<{}>, intervals = [10000, 3000]) {
        return new Promise((resolve, reject) => {
            let fn2call = fn;
            if (intervals.length > 0) {
                let waitTime = 2 * +intervals[intervals.length - 1];
                fn2call = () => this.circuitBreaker(fn, waitTime);
            }
            fn2call()
                .then(resolve)
                .catch((error) => {
                    if (intervals.length == 0) {
                        // reject('maximum retries exceeded');
                        reject(error);
                        return;
                    } else {
                        var interval = intervals.pop();
                        setTimeout(() => {
                            // Passing on "reject" is the important part
                            this.retry(fn, intervals).then(resolve, reject);
                        }, interval);
                    }
                });
        });
    }

    private circuitBreaker(fn: () => Promise<{}>, internval: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let timer = setTimeout(() => {
                reject({ timeout: true });
            }, internval);
            let prom = fn();
            prom.then(it => {
                clearTimeout(timer);
                resolve(it);
            }).catch(reject);
        });
    }
}

export class confirmMessage {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    constructor(title: string, message: string, confirmText?: string, cancelText?: string) {
        this.title = title;
        this.message = message;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
    }
}

export interface MonetaryValue{}