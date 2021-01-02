import { TestBed } from '@angular/core/testing';

import { TerminalHandlerService } from './terminal-handler.service';

describe('TerminalHandlerService', () => {
  let service: TerminalHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
