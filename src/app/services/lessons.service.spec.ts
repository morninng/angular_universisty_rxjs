/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LessonsService } from './lessons.service';

describe('Lessons Service', () => {
  beforeEachProviders(() => [LessonsService]);

  it('should ...',
      inject([LessonsService], (service: LessonsService) => {
    expect(service).toBeTruthy();
  }));
});
