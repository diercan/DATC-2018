import { TestBed } from '@angular/core/testing';

import { ConfService } from './conf.service';

describe('ConfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfService = TestBed.get(ConfService);
    expect(service).toBeTruthy();
  });
});
