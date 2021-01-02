import { HelpCommand } from './help.command';
import { ClearCommand } from './clear.command';
import { TerminalExecutorService } from './_/terminal-executor.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Commands {
  constructor(
    private readonly terminalExecutorService: TerminalExecutorService
  ) {
  }

  public init(): void {
    this.terminalExecutorService.add('help', HelpCommand);
    this.terminalExecutorService.add('clear', ClearCommand);
  }
}
