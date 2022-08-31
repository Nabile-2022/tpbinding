import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchMovieService } from '../services/search-movie.service';
import { FormValidators } from './form-validators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit
{
  currentYear = new Date().getFullYear();
  searchForm: FormGroup;

  results?: JSON;
  error?: string;

  constructor(private formBuilder: FormBuilder, private searchMovieService: SearchMovieService)
  {
    this.searchForm = formBuilder.group(
      {
        title: ['', { validators: FormValidators.title() }],
        year: [this.currentYear, { validators: [FormValidators.numberBetween(1900, this.currentYear)] }]
      }
    );
  }

  ngOnInit(): void
  {
  }

  startSearch()
  {
    const title = this.searchForm.controls['title'];
    const year = this.searchForm.controls['year'];

    const self = this; // JS sucks at remembering the context in async (?) lambdas, this ensures we have the correct one.
    const action = (movies: any) =>
    {
      if (movies.Error)
      {
        self.error = movies.Error;
        self.results = undefined;
        return;
      }

      self.error = undefined;
      self.results = movies;
    };

    if (!title.valid || !year.valid)
      return;

    this.searchMovieService.search(
      action,
      title.value || '',
      parseInt(year.value));
  }
}
