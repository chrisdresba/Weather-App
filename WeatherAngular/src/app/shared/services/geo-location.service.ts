import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class GeoLocationService {

    constructor(public servSpinner:SpinnerService){

    }

    public getCurrentPosition(): Promise<any> {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        });
    }

}