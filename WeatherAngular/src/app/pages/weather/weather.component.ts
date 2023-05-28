import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { WeatherData } from './../..//shared/interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  @Input() public weather!: WeatherData;
  @Input() public city!: string;
  @Input() public country!: string;
  public BASE_URL = 'http://openweathermap.org/img/wn';
}
