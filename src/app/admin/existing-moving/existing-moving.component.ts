import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';

interface Movie {
  id: number;
  title: string;
  description: string;
  coverImageBase64: string;
  price?: number;
}

@Component({
  selector: 'app-existing-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './existing-moving.component.html',
  styleUrls: ['./existing-moving.component.css']
})

export class ExistingMovieComponent implements OnInit {
  movies: Movie[] = [];
  currentMovieIndex = 0;
  selectedDate: string = '';
  selectedTime: string = '';

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: number[] = [];

  timeSlots = [
    { time: '10:00 am', available: true },
    { time: '12:00 pm', available: true },
    { time: '2:00 pm', available: false },
    { time: '4:00 pm', available: false },
    { time: '6:00 pm', available: true },
    { time: '8:00 pm', available: true }
  ];

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  loadMovies(): void {
    this.apiService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 1) {
      this.currentMovieIndex++;
    }
  }

  previousMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  handleSubmit(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select both date and time');
      return;
    }

    console.log('New Showing Created:', {
      movieId: this.movies[this.currentMovieIndex].id,
      movieTitle: this.movies[this.currentMovieIndex].title,
      date: this.selectedDate,
      time: this.selectedTime
    });

    alert('Showing created successfully! (Demo)');
    this.router.navigate(['/admin']);
  }
}

