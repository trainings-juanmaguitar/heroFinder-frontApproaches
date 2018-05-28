import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  query: string = ''
  @Output() search = new EventEmitter<string>();
  constructor() { }

  submitSearch(event) {
    event.preventDefault()
    this.search.next(this.query);
  }

  ngOnInit() {
  }

}
