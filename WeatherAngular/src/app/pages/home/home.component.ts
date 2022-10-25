import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './../../shared/interfaces/weather.interface';
import { WeatherService } from '../../shared/services/weather.service';
import { GeoLocationService } from './../../shared/services/geo-location.service';
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public weather$!: Observable<WeatherData>;
  public background!:string;

  constructor(
    private readonly weatherSvc: WeatherService,
    private readonly geoLocationSvc: GeoLocationService
  ) {
    this.viewImageBackground();
    if (navigator?.geolocation) {
      this.getLocation();
    }

  }

  
  public viewImageBackground(){
   let number =  Math.floor(Math.random() * (5 + 1));
   this.background = "./../../../assets/images/background" + number + ".jpg";
  }

  public onSearch(city: string): void {
    if(city.length > 2){
    this.weather$ = this.weatherSvc.getWeatherByName(city);
    }
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.geoLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);
    } catch (error) {
    }
  }


  ngOnInit(): void {
  }

}
