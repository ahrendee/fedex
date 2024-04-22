import { TestBed } from '@angular/core/testing';

import { JsonPlaceHolderService } from './json-place-holder.service';

describe('JsonPlaceHolderService', () => {
  let service: JsonPlaceHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
