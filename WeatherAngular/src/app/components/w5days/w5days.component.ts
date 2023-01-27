import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './../..//shared/interfaces/weather.interface';

@Component({
  selector: 'app-w5days',
  templateUrl: './w5days.component.html',
  styleUrls: ['./w5days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W5daysComponent implements OnInit {

  @Input() public weather!: WeatherData;
  @Input() public weather5Days!: WeatherData[];
  public BASE_URL = 'http://openweathermap.org/img/wn';

  constructor() {
  }

  ngOnInit(): void {
   
  }


}

