import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent  {
  query = ''
  @Input() message;
  @Output() search = new EventEmitter();

  submitSearch(event) {
    event.preventDefault()
    this.search.emit(this.query);
  }

}
