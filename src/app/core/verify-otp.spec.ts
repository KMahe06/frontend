import { TestBed } from '@angular/core/testing';

import { VerifyOtp } from './verify-otp';

describe('VerifyOtp', () => {
  let service: VerifyOtp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyOtp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
