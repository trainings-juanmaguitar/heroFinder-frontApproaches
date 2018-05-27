import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = ''
  @Output() search = new EventEmitter<string>();
  constructor() { }

  submitSearch(event) {
    event.preventDefault()
    console.log(this)
    this.search.next(this.query);
  }

  ngOnInit() {
  }

}
