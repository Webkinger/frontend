import { Injectable } from '@angular/core';
import { Terminal } from 'xterm';
import { TerminalCommand } from './_';
import { TerminalExecutorService } from './_/terminal-executor.service';

@Injectable({
  providedIn: 'root'
})
export class HelpCommand implements TerminalCommand {
  description = 'shows this help';
  commands = {};
  flags = [];

  constructor(
    private readonly terminalExecutorService: TerminalExecutorService
  ) {
  }

  execute(term: Terminal, args: any): void {
    term.writeln('Commands:');

    for (const command in this.terminalExecutorService.commands) {
      term.writeln(`  ${command}: ${' '.repeat(10 - command.length) + this.terminalExecutorService.commands[command].description}`);
    }
  }
}
