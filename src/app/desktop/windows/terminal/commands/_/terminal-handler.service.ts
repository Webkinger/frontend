import { Injectable } from '@angular/core';
import { TerminalExecutorService } from './terminal-executor.service';
import { Terminal } from 'xterm';
import { Commands } from '../commands';

@Injectable({
  providedIn: 'root'
})
export class TerminalHandlerService {

  private buffer: { [term: string]: string } = {};

  constructor(
    private readonly terminalExecutorService: TerminalExecutorService,
    private readonly commands: Commands
  ) {
    commands.init();
  }

  public add(id: string, term: Terminal) {
    this.buffer[id] = '';
    this.prompt(term);
    term.onData(data => this.onData(id, term, data));
  }

  private onData(id: string, term: Terminal, data: string): void {
    switch (data) {
      case '\u0003': // Ctrl+C
        term.write('^C');
        this.buffer[id] = '';
        this.prompt(term);
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case '\r': // Enter
        term.writeln(data);
        // @ts-ignore
        this.terminalExecutorService.execute(term, this.buffer[id]);
        this.buffer[id] = '';
        this.prompt(term);
        break;
      case '\u007F': // Backspace (DEL)
        // Do not delete the prompt
        // @ts-ignore
        if (term._core.buffer.x > 2) {
          term.write('\b \b');
        }
        break;
      default: // Print all other characters for demo
        term.write(data);
        this.buffer[id] += data;
    }
  }

  private prompt(term: Terminal): void {
    term.write('$ ');
  }
}
