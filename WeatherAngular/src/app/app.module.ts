import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './../app/components/search/search.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { CommonModule } from '@angular/common';
import { WeatherInterceptor } from './shared/interceptors/weather.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCitiesComponent } from './components/list-cities/list-cities.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SpinnerComponent,
    WeatherComponent,
    NotFoundComponent,
    FooterComponent,
    ListCitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule,

    CommonModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: WeatherInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
