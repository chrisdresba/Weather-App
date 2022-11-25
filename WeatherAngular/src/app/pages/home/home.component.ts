import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './../../shared/interfaces/weather.interface';
import { WeatherService } from '../../shared/services/weather.service';
import { GeoLocationService } from './../../shared/services/geo-location.service';
import { fromEvent } from "rxjs";
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public weather$!: Observable<WeatherData>;
  public cities$: Observable<WeatherData>[] = [];
  public city:string="";
  public country:String="";
  public getScreenHeight: any;
  public background: string = "./../../../assets/images/background3.jpg";

  constructor(
    private readonly weatherSvc: WeatherService,
    private readonly geoLocationSvc: GeoLocationService,
    private router : Router,
    public viewportScroller: ViewportScroller
  ) {
    
    this.viewImageBackground();
    if (navigator?.geolocation) {
      this.getLocation();
    }
   
  }


  public viewImageBackground() {
    let number = Math.floor(Math.random() * (5 + 1));
    this.background = "./../../../assets/images/background" + number + ".jpg";
  }

  public onSearch(city: string): void {
    if (city.length > 3) {
      this.weather$ = this.weatherSvc.getWeatherByName(city);
      this.weather$.subscribe(item=>{
        this.city = item.name;
        this.country = item.sys.country
        this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);
      })
    }else{
      this.city = "";
      this.country = "";
    }
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.geoLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
      this.weather$.subscribe(item=>{
        this.city = item.name;
        this.country = item.sys.country
      })
      this.viewportScroller.scrollToPosition([0, this.getScreenHeight]);
    } catch (error) {
    }
  }

  ngOnInit(): void {
    this.getScreenHeight = window.innerHeight;
  }

}
