import { Terminal } from 'xterm';

export interface TerminalCommand {
  description: string;
  flags: TerminalFlag[];
  commands: { [name: string]: TerminalCommand }; // commands are currently not supported

  execute(term: Terminal, args: any): void;
}

export interface TerminalFlag {
  name: string;
  aliases: string[];
  description: string;
  type: 'string' | 'boolean' | 'number';
}

// if you need more:
// https://github.com/doowb/ansi-colors/blob/a4794363369d7b4d1872d248fc43a12761640d8e/index.js#L70-L115
export const colors = {
  reset: ansi(0, 0),
  bold: ansi(1, 22),
  dim: ansi(2, 22),
  italic: ansi(3, 23),
  underline: ansi(4, 24),
  inverse: ansi(7, 27),
  hidden: ansi(8, 28),
  strikethrough: ansi(9, 29),

  black: ansi(30, 39),
  red: ansi(31, 39),
  green: ansi(32, 39),
  yellow: ansi(33, 39),
  blue: ansi(34, 39),
  magenta: ansi(35, 39),
  cyan: ansi(36, 39),
  white: ansi(37, 39),
  gray: ansi(90, 39)
};

function ansi(open: number, close: number): { o: string, c: string } {
  return { o: `\u001b[${open}m`, c: `\u001b[${close}m` };
}
