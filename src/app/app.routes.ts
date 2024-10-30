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

export const routes: Routes = [
  /**PUBLIC ROUTES */
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home', component: HomeComponent},
  {path: 'movies', component: MovieSelectionComponent},
  { path: 'seat/:id', component: SeatSelectionComponent},


  /**ADMIN ROUTES */
  {path: 'admin', component: AdminComponent},
  {path: 'admin/add-movie', component: AddMovieComponent},
  { path: 'movie-create/:id', component: MovieCreateComponent },

  /**MOVIE SHOWING */
  { path: 'seat', component: SeatSelectionComponent }
];



