import { TestBed } from '@angular/core/testing';

import { TestLibraryService } from './test-library.service';

describe('TestLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestLibraryService = TestBed.get(TestLibraryService);
    expect(service).toBeTruthy();
  });
});
