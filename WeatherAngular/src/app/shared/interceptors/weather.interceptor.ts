import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Injectable()
export class WeatherInterceptor implements HttpInterceptor {

    constructor(private readonly servSpinner : SpinnerService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.servSpinner.show();
        const cloneReq = req.clone({
            params: req.params.appendAll({
                'units': 'metric',
                'appid': environment.openWeather.key
            })
        });
        return next.handle(cloneReq).pipe(
            finalize(()=> this.servSpinner.hide())
        );
    }

}