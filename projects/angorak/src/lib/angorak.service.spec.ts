import { TestBed } from '@angular/core/testing';

import { AngorakService } from './angorak.service';

describe('AngorakService', () => {
  let service: AngorakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngorakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
