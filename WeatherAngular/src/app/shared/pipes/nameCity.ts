import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCity'
})
export class NameCityPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value.split(',');
    let length = parts.length;

      return parts[0].trim() + ', ' + parts[length - 2].trim() +', ' + parts[length - 1].trim();

  }
}
