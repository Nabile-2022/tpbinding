import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films.component';
import { SearchMovieService } from './services/search-movie.service';
import { HttpClientModule } from '@angular/common/http'
import { SearchFormComponent } from './search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDirective } from './directives/list.directive';

const routes: Routes =
  [
    { path: 'films', component: FilmsComponent }
  ];

@NgModule({
  declarations: [
    FilmsComponent,
    SearchFormComponent,
    ListDirective
  ],
  providers: [SearchMovieService],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class FilmsModule { }
