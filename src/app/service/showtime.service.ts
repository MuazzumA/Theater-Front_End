import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment'; // Import moment for date formatting

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private apiUrl = 'http://localhost:8080/movie'; 

  constructor(private http: HttpClient) {}

  getShowtimes(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${movieId}/showings`);
  }

  getSeats(movieId: number, showDate: string, showTime: string): Observable<any> {
    const formattedDate = moment(showDate, 'MM/DD').format('YYYY-MM-DD'); // Format date
    const formattedTime = moment(showTime, 'h:mm a').format('HH:mm:ss'); // Format time

    return this.http.get(`${this.apiUrl}/${movieId}/showings/${showDate}/${showTime}`, {
      params: { showDate: formattedDate, showTime: formattedTime }
    });
  }

}
