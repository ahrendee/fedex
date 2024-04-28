import { TestBed } from '@angular/core/testing';

import { JsonPlaceHolderService } from './json-place-holder.service';
import { HttpClientModule } from '@angular/common/http';

describe('JsonPlaceHolderService', () => {
  let service: JsonPlaceHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientModule],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(JsonPlaceHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});