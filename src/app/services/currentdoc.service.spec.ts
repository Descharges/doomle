import { TestBed } from '@angular/core/testing';

import { CurrentdocService } from './currentdoc.service';

describe('CurrentdocService', () => {
  let service: CurrentdocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentdocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
