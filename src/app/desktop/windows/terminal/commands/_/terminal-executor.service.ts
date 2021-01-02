import { Injectable, Injector, Type } from '@angular/core';
import { colors, TerminalCommand } from './index';
import parse from 'yargs-parser/browser';
import { Terminal } from 'xterm';

@Injectable({
  providedIn: 'root'
})
export class TerminalExecutorService {

  private commands0: { [name: string]: TerminalCommand } = {};

  constructor(
    private readonly injector: Injector
  ) {
  }

  get commands(): { [name: string]: TerminalCommand } {
    return this.commands0;
  }

  public add(name: string, command: Type<TerminalCommand>): void {
    this.commands0[name] = this.injector.get(command);
  }

  public execute(term: Terminal, data: string): void {
    // @ts-ignore
    const input: { _: string[], [key: string]: string } = parse(data);

    // empty input
    if (!input._.length) {
      return;
    }

    const command = this.commands0[input._[0].toLowerCase()];
    if (!command) {
      term.writeln(`${colors.red.o}Error${colors.reset.c}: Command "${input._[0]}" not found`);
      return;
    }

    // remove command name
    input._.shift();

    command.execute(term, input);
  }
}
