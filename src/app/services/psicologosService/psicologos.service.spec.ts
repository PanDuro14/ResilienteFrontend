import { TestBed } from '@angular/core/testing';

import { PsicologosService } from './psicologos.service';

describe('PsicologosService', () => {
  let service: PsicologosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsicologosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
