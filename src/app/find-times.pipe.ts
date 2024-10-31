import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findTimes',
  standalone: true
})
export class FindTimesPipe implements PipeTransform {
  transform(showTimes: { date: string; times: string[] }[], selectedDate: string): string[] {
    const selectedShowtime = showTimes.find(showtime => showtime.date === selectedDate);
    return selectedShowtime ? selectedShowtime.times : [];
  }
}