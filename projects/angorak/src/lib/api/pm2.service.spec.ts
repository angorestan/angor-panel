import { TestBed } from '@angular/core/testing';

import { Pm2Service } from './pm2.service';

describe('Pm2Service', () => {
  let service: Pm2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pm2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
