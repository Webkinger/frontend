import { Injectable } from '@angular/core';
import { Terminal } from 'xterm';
import { TerminalCommand } from './_';

@Injectable({
  providedIn: 'root'
})
export class ClearCommand implements TerminalCommand {
  description = 'clears the terminal';
  commands = {};
  flags = [];

  execute(term: Terminal, args: any): void {
    term.clear();
  }
}
