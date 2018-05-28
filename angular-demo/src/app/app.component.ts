import { Component } from '@angular/core';
import { ApiMarvelService } from './api-marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  results = [];
  constructor(
    public apiMarvelService: ApiMarvelService
  ) {}

  getHeroes(query) {
    this.apiMarvelService.searchHeroes(query)
      .subscribe(({ data: { results } }) => this.results = results);
  }
}

