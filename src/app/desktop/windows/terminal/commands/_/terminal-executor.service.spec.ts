import { TestBed } from '@angular/core/testing';

import { TerminalExecutorService } from './terminal-executor.service';

describe('TerminalExecutorService', () => {
  let service: TerminalExecutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalExecutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
