import { TestBed } from '@angular/core/testing';

import { CharactercardService } from './charactercard.service';

describe('CharactercardService', () => {
  let service: CharactercardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactercardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
