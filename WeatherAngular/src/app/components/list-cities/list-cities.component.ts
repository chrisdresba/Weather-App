import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/shared/interfaces/weather.interface';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {


  public cities: WeatherData[] = [];
  public listCities: string[] = ['barcelona', 'bariloche', 'berlin', 'lima', 'quito', 'rio de janeiro'];
  constructor(public weatherSvc: WeatherService) { }

  ngOnInit(): void {
    this.listCities.forEach(city => {
      this.weatherSvc.getWeatherByName(city).subscribe(item => {
        this.cities.push(item);
      })
    })
  }

}
