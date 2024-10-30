import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-showing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-showing.component.html',
  styleUrls: ['./add-showing.component.css']
})
export class AddShowingComponent {
  constructor(private router: Router) {}

  navigateToNewMovie(): void {
    this.router.navigate(['/admin/add-movie']);
  }

  navigateToExistingMovie(): void {
    this.router.navigate(['/admin/existing-movie']);
  }
}
