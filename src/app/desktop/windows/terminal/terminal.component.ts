import { Component, ElementRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { WindowComponent, WindowDelegate } from '../../window/window-delegate';
import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalHandlerService } from './commands/_/terminal-handler.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent extends WindowComponent implements /* TerminalAPI, */ OnInit, OnDestroy {

  @ViewChild('terminal', { static: true }) terminal: ElementRef<HTMLElement>;
  private readonly term = new Terminal({
    fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Ubuntu Mono", "Jetbrains Mono", "Liberation Mono", "Courier New", monospace'
  });
  private readonly fitAddon = new FitAddon();

  constructor(
    private readonly terminalHandlerService: TerminalHandlerService
  ) {
    super();
  }

  ngOnInit() {
    this.term.loadAddon(new WebLinksAddon());
    this.term.loadAddon(this.fitAddon);
    this.term.open(this.terminal.nativeElement);

    this.terminalHandlerService.add(Math.random().toString(), this.term);

    setInterval(() => {
      this.fitAddon.fit();
    }, 1000);
  }

  ngOnDestroy() {
    this.term.dispose();
  }
}

export class TerminalWindowDelegate extends WindowDelegate {
  title = 'Terminal';
  icon = 'assets/desktop/img/terminal.svg';
  type: Type<any> = TerminalComponent;
}
