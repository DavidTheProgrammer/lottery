import { Component, ViewChild, ElementRef } from '@angular/core';

import { ScrollToService } from 'ng2-scroll-to-el';

import { IBoardOptions } from './board-options.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('boards') boards: ElementRef;

  boardOptions: IBoardOptions;

  constructor(private _scroll: ScrollToService) {}

  onGenerateBoards(options: IBoardOptions) {
    this.boardOptions = options;

    // Capture the board element
    const boardElement: HTMLElement = this.boards.nativeElement;
    // Scroll to the board element
    this._scroll.scrollTo(boardElement);
  }
}
