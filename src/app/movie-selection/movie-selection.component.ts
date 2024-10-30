import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MovieShowingComponent } from '../movie-showing/movie-showing.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-selection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './movie-selection.component.html',
  styleUrl: './movie-selection.component.css'
})
export class MovieSelectionComponent {
  httpClient = inject(HttpClient);
  data: any[] = [];
  searchQuery: string = ''; // Property to hold the search input
  filteredMovies: any[] = []; // Property to hold the filtered results

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:8080/home')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
        this.filteredMovies = data; // Initialize filteredMovies with all data
      });
  }

  searchMovies() {
    console.log('Search Query:', this.searchQuery); // Debugging line
    if (this.searchQuery.trim() === '') {
      this.filteredMovies = this.data; // Show all movies if search is empty
    } else {
      this.filteredMovies = this.data.filter(post => 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      ); 
    }
    console.log('Filtered Movies:', this.filteredMovies); // Debugging line
  }

  fetchMovieDetails(movieId: number) {
    this.httpClient.get(`http://localhost:8080/movie/${movieId}`)
      .subscribe((data: any) => {
        console.log('Movie details:', data);
        // Here you can handle the received data, e.g., navigate to a details page or display in a modal
      }, error => {
        console.error('Error fetching movie details:', error);
      });
      this.router.navigate(['/seat', movieId]);
  }

}
