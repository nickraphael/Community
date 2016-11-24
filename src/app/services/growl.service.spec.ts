/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GrowlService } from './growl.service';

describe('Service: Growl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowlService]
    });
  });

  it('should ...', inject([GrowlService], (service: GrowlService) => {
    expect(service).toBeTruthy();
  }));
});
