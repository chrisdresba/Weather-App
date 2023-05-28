// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  openWeather: {
    key: '1a8c61f0f54f9eb40100d8184a38a12e',
    url: 'https://api.openweathermap.org/data/2.5'
  },
  MAPBOX_KEY: 'pk.eyJ1IjoiY2hyaXNkcmVzYmEiLCJhIjoiY2xoZm1oYWNmMDVpNzNlbXFrcWd1azJpYyJ9.nGdW9HML-a0b4-eoBWYWNg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
