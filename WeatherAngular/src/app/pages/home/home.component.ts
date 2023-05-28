import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Coord,
  WeatherData,
} from './../../shared/interfaces/weather.interface';
import { WeatherService } from '../../shared/services/weather.service';
import { GeoLocationService } from './../../shared/services/geo-location.service';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { __await } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data!: Observable<any>;
  public weather$!: Observable<WeatherData>;
  public weather5Days$: WeatherData[] = [];
  public weather5DaysAux: WeatherData[] = [];
  public weathers$: WeatherData[] = [];
  public view: boolean = true;
  public city: string = '';
  public country: string = '';
  public listCities: any[] = [];
  public cities: any[] = [];
  public getScreenHeight: any;
  public background: string = 'assets/images/background0.webp';
  public coord: Coord;

  constructor(
    private readonly weatherSvc: WeatherService,
    private readonly geoLocationSvc: GeoLocationService,
    private router: Router,
    public viewportScroller: ViewportScroller
  ) {
    this.background = 'assets/images/background0.webp';
    this.coord = {
      latitude: 0,
      longitude: 0,
    };
    window.scroll(0, 0);
    //  this.viewImageBackground();
    if (navigator?.geolocation) {
      this.getLocation();
    }
  }

  public viewImageBackground() {
    let number = Math.floor(Math.random() * (5 + 1));
    this.background = 'assets/images/background' + number + '.webp';
  }

  async onSearch(city: string) {
    if (city.length > 3) {
      this.cities = await this.weatherSvc.searchCities(city);
      this.city = '';
    } else {
      this.cities = [];
    }
  }

  searchCity(city: any): void {
    this.coord.latitude = city.lat;
    this.coord.longitude = city.lng;
    this.selectCity(this.coord, city.name);
    this.cities = [];
  }

  selectCity(coords: Coord, name: string): void {
    try {
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
      this.weather$.subscribe((item) => {
        this.city = name.split(',')[0];
        this.country = item.sys.country;
      });

      this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);

      this.data = this.weatherSvc.getWeatherByCoords5Days(coords);
      this.data.subscribe((item) => {
        this.weather5Days$ = item.list;
        this.weather5DaysAux = item.list;
        this.weather5Days$ = this.weather5Days$.filter(
          (item) =>
            item.dt_txt.substring(item.dt_txt.length - 8, item.dt_txt.length) ==
            '12:00:00'
        );
        this.filterTempMaxMin();
      });
    } catch (error) {}
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.geoLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
      this.weather$.subscribe((item) => {
        this.city = item.name;
        this.country = item.sys.country;
      });

      this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);

      this.data = this.weatherSvc.getWeatherByCoords5Days(coords);
      this.data.subscribe((item) => {
        this.weather5Days$ = item.list;
        this.weather5DaysAux = item.list;
        this.weather5Days$ = this.weather5Days$.filter(
          (item) =>
            item.dt_txt.substring(item.dt_txt.length - 8, item.dt_txt.length) ==
            '12:00:00'
        );
        this.filterTempMaxMin();
      });
    } catch (error) {}
  }

  ngOnInit(): void {
    this.getScreenHeight = window.innerHeight;
    setTimeout(() => {
      this.view = false;
    }, 2000);
  }

  //filter the max and min temperature
  filterTempMaxMin() {
    for (let index = 0; index < this.weather5Days$.length; index++) {
      this.weather5DaysAux.forEach((data) => {
        if (
          data.dt_txt.substring(0, 10) ==
          this.weather5Days$[index].dt_txt.substring(0, 10)
        ) {
          //compare date
          data.main.temp_min < this.weather5Days$[index].main.temp_min
            ? (this.weather5Days$[index].main.temp_min = data.main.temp_min)
            : false; //compare temp min

          data.main.temp_max > this.weather5Days$[index].main.temp_max
            ? (this.weather5Days$[index].main.temp_max = data.main.temp_max)
            : false; //compare temp max
        }
      });
    }
  }
}
