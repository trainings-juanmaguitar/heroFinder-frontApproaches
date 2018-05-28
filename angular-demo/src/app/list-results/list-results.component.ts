import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.css']
})
export class ListResultsComponent {
  @Input() results: Array<object> = []
}
