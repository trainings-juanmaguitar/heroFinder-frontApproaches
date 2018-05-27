import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResultsComponent } from './list-results.component';

describe('ListResultsComponent', () => {
  let component: ListResultsComponent;
  let fixture: ComponentFixture<ListResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
