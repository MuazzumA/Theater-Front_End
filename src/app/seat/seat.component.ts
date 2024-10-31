import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';
import { ShowtimeService } from '../service/showtime.service';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { FindTimesPipe } from '../find-times.pipe';

interface Movie {
  id: number;
  title: string;  // Changed from 'name' to 'title' to match your movie details
  description?: string; // Optional if needed
  coverImageBase64: string; // Added to match your movie details
}

interface Showtime {
  date: string;
  times: string[]; // Array of times for this date
} 


interface SeatState {
  status: 'available' | 'occupied' | 'selected';
  id: string;
}

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, FindTimesPipe],
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatSelectionComponent implements OnInit {
  // selectedMovie: Movie = {
  //   id: 1,
  //   name: 'Star Wars: The Phantom Menace',
  //   theater: 'Theater Name',
  //   time: 'Show Time',
  //   duration: 'Movie Duration',
  //   showDates: ['10/21', '10/22', '10/23', '10/24', '10/25'],
  //   imageUrl: 'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_.jpg'
  // };


  

  selectedMovieId!: number; // Assume you pass this from the previous component
  selectedMovie!: Movie;
  seatLayout: SeatState[][] = [];
  showTimes: { date: string; times: string[] }[] = [];

  selectedDate: string = '';
  selectedTime: string = '';
  private isBrowser: boolean;

  dummyShowtimes: Showtime[] = [
    {
      date: '2024-10-30',
      times: ['10:00 AM', '1:00 PM', '4:00 PM']
    },
    {
      date: '2024-10-31',
      times: ['11:00 AM', '2:00 PM', '5:00 PM']
    },
    {
      date: '2024-11-01',
      times: ['12:00 PM', '3:00 PM', '6:00 PM']
    }
  ];
  
  // Dummy seat layout
  dummySeatLayout: SeatState[][] = this.initializeDummySeats();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private showtimeService: ShowtimeService, // Inject the service
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Retrieve the movie ID from the route parameters
    this.route.params.subscribe(params => {
      this.selectedMovieId = +params['id']; // Convert string to number
      this.fetchData(); // Fetch movie data after getting the ID
    });

    this.loadShowtimes(); // Load showtimes for the selected movie
  }

  fetchData() {
    this.apiService.getMovieById(this.selectedMovieId).subscribe(
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  private initializeDummySeats(): SeatState[][] {
    return Array(8).fill(null).map((_, rowIndex) =>
      Array(10).fill(null).map((_, seatIndex) => ({
        status: Math.random() < 0.3 ? 'occupied' : 'available', // Randomly mark some as occupied
        id: `${this.getRowLabel(rowIndex)}${seatIndex + 1}`
      }))
    );
  }

  getRowLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  loadSeats(): void {
    if (this.selectedMovieId && this.selectedDate && this.selectedTime) {
      this.seatLayout = this.dummySeatLayout; // Load the dummy seat layout
    }
  }

  onSeatClick(rowIndex: number, seatIndex: number): void {
    const seat = this.seatLayout[rowIndex][seatIndex];
    if (seat.status === 'occupied') return;

    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  
    // Save to local storage if in the browser
    if (this.isBrowser) {
      this.saveToLocalStorage();
    }
  }
  

  private loadShowtimes(): void {
    if (this.selectedMovieId) {
      this.showtimeService.getShowtimes(this.selectedMovieId).subscribe(
        (data) => {
          // Use the movie data from the API
          this.selectedMovie = data.movie; // Ensure this matches your API response structure
  
          // Use dummy showtimes for testing
          this.showTimes = this.dummyShowtimes; // Use dummy data directly
  
          // You can also consider getting showDates from your movie data if needed
          this.selectedDate = this.showTimes[0]?.date; // Default to the first show date
          this.selectedTime = this.showTimes[0]?.times[0]; // Default to the first time of the first date
          
          this.loadSeats(); // Load seats after fetching showtimes
        },
        (error) => {
          console.error('Error fetching showtimes:', error);
        }
      );
    }
  }
  

  selectDate(date: string): void {
    this.selectedDate = date;
    this.loadSeats();
    this.saveToLocalStorage();
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.loadSeats();
    this.saveToLocalStorage();
  }

  hasSelectedSeats(): boolean {
    return this.seatLayout.some(row =>
      row.some(seat => seat.status === 'selected')
    );
  }

  continue(): void {
    const selectedSeats = this.seatLayout
      .flatMap(row => row.filter(seat => seat.status === 'selected'))
      .map(seat => seat.id);

    console.log('Selected seats:', selectedSeats);
    console.log('Selected date:', this.selectedDate);
    console.log('Selected time:', this.selectedTime);
    // Implement checkout logic here
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser) return;
    try {
      const dataToSave = {
        seatLayout: this.seatLayout,
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime
      };
      localStorage.setItem('seatSelection', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadSavedData(): void {
    if (!this.isBrowser) return;
    try {
      const savedData = localStorage.getItem('seatSelection');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        this.seatLayout = parsed.seatLayout;
        this.selectedDate = parsed.selectedDate;
        this.selectedTime = parsed.selectedTime;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}

