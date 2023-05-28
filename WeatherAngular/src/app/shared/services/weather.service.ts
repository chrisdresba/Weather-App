import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coord, WeatherData } from '../interfaces/weather.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
const axios = require('axios').default;

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly API_URL = environment.openWeather.url;

  constructor(private readonly http: HttpClient) {}

  public getWeatherByName(city: string): Observable<WeatherData> {
    const params = new HttpParams().set('q', city);
    return this.http.get<WeatherData>(`${this.API_URL}/weather`, { params });
  }

  public getWeatherByName5Days(city: string): Observable<WeatherData> {
    const params = new HttpParams().set('q', city);
    return this.http.get<WeatherData>(`${this.API_URL}/forecast`, { params });
  }

  public getWeatherByCoords(coord: Coord): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', coord.latitude)
      .set('lon', coord.longitude);
    return this.http.get<WeatherData>(`${this.API_URL}/weather`, { params });
  }

  public getWeatherByCoords5Days(coord: Coord): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', coord.latitude)
      .set('lon', coord.longitude);
    return this.http.get<WeatherData>(`${this.API_URL}/forecast`, { params });
  }

  //Config MapBox
  get paramsMapbox() {
    return {
      access_token: environment.MAPBOX_KEY,
      language: 'es',
      limit: 5,
    };
  }

  //City Search Filter
  async searchCities(city: string) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
        params: this.paramsMapbox,
      });

      const response = await instance.get();
      return response.data.features.map((place: any) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async listCities(cities = []) {
    const choices = cities.map((city: any, i) => {
      const idx = `${i + 1}.`;
      return {
        value: city.id,
        name: `${idx} ${city}`,
      };
    });
  }
}
