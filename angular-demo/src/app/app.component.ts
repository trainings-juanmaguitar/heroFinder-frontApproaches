import { Component, OnInit } from '@angular/core';
import { ApiMarvelService } from './api-marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results = [];
  constructor(public apiMarvelService: ApiMarvelService) {
  }
  ngOnInit() {

  }
  getHeroes(query) {
    this.apiMarvelService.getHeroes(query)
      .subscribe((results) => this.results = results);
  }
}

