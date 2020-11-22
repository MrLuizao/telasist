import { TestBed } from '@angular/core/testing';

import { PinsJsonService } from './pins-json.service';

describe('PinsJsonService', () => {
  let service: PinsJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinsJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
