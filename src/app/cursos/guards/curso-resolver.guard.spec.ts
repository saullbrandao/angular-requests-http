import { TestBed } from '@angular/core/testing';

import { CursoResolverGuard } from './curso-resolver.guard';

describe('CursoResolverGuard', () => {
  let guard: CursoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CursoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
