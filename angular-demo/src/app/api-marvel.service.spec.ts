import { TestBed, inject } from '@angular/core/testing';

import { ServiceApiMarvelService } from './service-api-marvel.service';

describe('ServiceApiMarvelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceApiMarvelService]
    });
  });

  it('should be created', inject([ServiceApiMarvelService], (service: ServiceApiMarvelService) => {
    expect(service).toBeTruthy();
  }));
});
