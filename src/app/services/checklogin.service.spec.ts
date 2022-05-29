import { TestBed } from '@angular/core/testing';

import { CheckloginService } from './services/checklogin.service';

describe('CheckloginService', () => {
  let service: CheckloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
