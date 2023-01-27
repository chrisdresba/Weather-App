import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './../../shared/interfaces/weather.interface';
import { WeatherService } from '../../shared/services/weather.service';
import { GeoLocationService } from './../../shared/services/geo-location.service';
import { fromEvent } from "rxjs";
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data!: Observable<any>;
  public weather$!: Observable<WeatherData>;
  public weather5Days$: WeatherData[] = [];
  public weather5DaysAux: WeatherData[] = [];
  public weathers$: WeatherData[] = [];
  public view: boolean = true;
  public city: string = "";
  public country: String = "";
  public getScreenHeight: any;
  public background: string = "./../../../assets/images/background3.jpg";

  constructor(
    private readonly weatherSvc: WeatherService,
    private readonly geoLocationSvc: GeoLocationService,
    private router: Router,
    public viewportScroller: ViewportScroller,
  ) {
    window.scroll(0, 0);
    this.viewImageBackground();
    if (navigator?.geolocation) {
      this.getLocation();
    }
    setTimeout(() => {
      this.view = false;
    }, 2000)

  }


  public viewImageBackground() {
    let number = Math.floor(Math.random() * (5 + 1));
    this.background = "./../../../assets/images/background" + number + ".jpg";
  }

  public onSearch(city: string): void {
    if (city.length > 3) {

      this.weather$ = this.weatherSvc.getWeatherByName(city);

      this.weather$.subscribe(item => {
        this.city = item.name;
        this.country = item.sys.country
        this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);
      })

      this.data = this.weatherSvc.getWeatherByName5Days(city);
      this.data.subscribe(item => {
        this.weather5Days$ = item.list;
        this.weather5DaysAux = item.list;
        this.weather5Days$ = this.weather5Days$.filter(item => item.dt_txt.substring(item.dt_txt.length - 8, item.dt_txt.length) == '12:00:00');

        for (let index = 0; index < this.weather5Days$.length; index++) {

          this.weather5DaysAux.forEach(data => {
            if (data.dt_txt.substring(0, 10) == this.weather5Days$[index].dt_txt.substring(0, 10)) { //compare date
              if (data.main.temp_min < this.weather5Days$[index].main.temp_min) { //compare temp min
                this.weather5Days$[index].main.temp_min = data.main.temp_min;
              }
              if (data.main.temp_max > this.weather5Days$[index].main.temp_max) { //compare temp max
                this.weather5Days$[index].main.temp_max = data.main.temp_max;
              }
            }
          });
        }
      })

    } else {
      this.city = "";
      this.country = "";
    }
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.geoLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
      this.weather$.subscribe(item => {
        this.city = item.name;
        this.country = item.sys.country;
      })

      this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);

      this.data = this.weatherSvc.getWeatherByCoords5Days(coords);
      this.data.subscribe(item => {
        this.weather5Days$ = item.list;
        this.weather5Days$ = this.weather5Days$.filter(item => item.dt_txt.substring(item.dt_txt.length - 8, item.dt_txt.length) == '12:00:00')
      })
    } catch (error) {
    }
  }

  ngOnInit(): void {
    this.getScreenHeight = window.innerHeight;
  }

}
