import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/shared/interfaces/weather.interface';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {

  //public weather!: WeatherData;
  public cities: WeatherData[]=[];

  constructor(public weatherSvc:WeatherService) { }

  ngOnInit(): void {
    this.weatherSvc.getWeatherByName('barcelona').subscribe(item=>{
      this.cities.push(item);
    })
    this.weatherSvc.getWeatherByName('bariloche').subscribe(item=>{
      this.cities.push(item);
    })
    this.weatherSvc.getWeatherByName('berlin').subscribe(item=>{
      this.cities.push(item);
    })
    this.weatherSvc.getWeatherByName('lima').subscribe(item=>{
      this.cities.push(item);
    })
    this.weatherSvc.getWeatherByName('quito').subscribe(item=>{
      this.cities.push(item);
    })
    this.weatherSvc.getWeatherByName('rio de janeiro').subscribe(item=>{
      this.cities.push(item);
    })
  }

}
