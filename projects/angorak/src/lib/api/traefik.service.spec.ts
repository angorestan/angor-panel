import { TestBed } from '@angular/core/testing';

import { TraefikService } from './traefik.service';

describe('TraefikService', () => {
  let service: TraefikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraefikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
