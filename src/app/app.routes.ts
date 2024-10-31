import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin/admin.component';
import { SeatSelectionComponent } from './seat/seat.component';
import { AddMovieComponent } from './admin/add-movie/add-movie.component';
import { MovieCreateComponent } from './success/movie-create/movie-create.component';
import { MovieSelectionComponent } from './movie-selection/movie-selection.component';
import { AddShowingComponent } from './admin/add-showing/add-showing.component';
import { ExistingMovieComponent } from './admin/existing-moving/existing-moving.component';



export const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieSelectionComponent },
  { path: 'seat/:id', component: SeatSelectionComponent},


  /**ADMIN ROUTES */
  {path: 'admin', component: AdminComponent},
  {path: 'admin/add-movie', component: AddMovieComponent},
  {path: 'movie-create/:id', component: MovieCreateComponent },
  {path: 'admin/add-showing', component: AddShowingComponent},
  {path: 'admin/existing-movie', component: ExistingMovieComponent},


  /**MOVIE SHOWING */
  { path: 'seat', component: SeatSelectionComponent }
];





