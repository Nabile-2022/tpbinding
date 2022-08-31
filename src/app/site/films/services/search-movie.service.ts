import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Query
{
  name?: string;
  value: any;
}

const ENDPOINT = 'https://www.omdbapi.com/';
const ENDPOINT_QUERY: Query[] = [{ name: 'apikey', value: 'b267f2ad' }];

function makeQuery(query: Query[]): string
{
  const fullQuery = ENDPOINT_QUERY.concat(query).filter(v => v.value).map(v => `${v.name}=${v.value}`).join('&');
  return [ENDPOINT, fullQuery].join('?');
}

type GetMoviesAction = (movies: any) => void; // TODO: Movie[].

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService
{
  constructor(private httpClient: HttpClient) { }

  search(action: GetMoviesAction, title: string, year = 0)
  {
    let query =
      [
        { name: 't', value: title },
        { name: 'y', value: year },
      ];

    this.httpClient.get(makeQuery(query)).subscribe(
      {
        next: value => action(value),
        error: error => console.error(error)
      }
    );
  }
}
