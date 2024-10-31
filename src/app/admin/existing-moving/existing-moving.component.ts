import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService, AddShowingDTO } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Movie {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  coverImageBase64?: string;
  image?: string;
  imageUrl?: string;
  price?: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
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
  selectedDate: string = ''; // Format: YYYY-MM-DD
  selectedTime: string = ''; // Format: HH:MM
  showingForm: FormGroup; // Reactive form group

  // Calendar data
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: number[] = [];

  // Time slots
  timeSlots: TimeSlot[] = [
    { time: '10:00', available: true },
    { time: '12:30', available: true },
    { time: '15:00', available: true },
    { time: '17:30', available: true },
    { time: '20:00', available: true },
    { time: '22:30', available: true }
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the reactive form
    this.showingForm = this.fb.group({
      movieId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMovies();
    this.initializeCalendarDays(); // Ensure calendar days are initialized
  }

  private initializeCalendarDays(): void {
    this.calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
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

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }

  previousMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    }
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 1) {
      this.currentMovieIndex++;
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.showingForm.patchValue({ date }); // Update the reactive form with selected date
    console.log('Selected date:', date);
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.showingForm.patchValue({ time }); // Update the reactive form with selected time
    console.log('Selected time:', time);
  }

  handleSubmit() {
    if (this.showingForm.valid) {
      const showingData: AddShowingDTO = {
        movieId: this.showingForm.value.movieId,
        date: this.showingForm.value.date,
        timeSlot: { time: this.showingForm.value.time },
      };

      this.apiService.addNewShowing(showingData).subscribe(response => {
        console.log('Showing added successfully', response);
        this.showingForm.reset(); // Reset the form after submission
      });
    }
  }
}


