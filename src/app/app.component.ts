import { Component, ViewChild, ElementRef } from '@angular/core';

import { IBoardOptions } from './board-options.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('boards') boards!: ElementRef;

  boardOptions: IBoardOptions = {
    numberOfBoards: 3,
    selectionsPerBoard: 6,
    sizeOfPool: 36,
    uniqueNumbersOnly: false,
  };

  constructor() {}

  onGenerateBoards(options: IBoardOptions) {
    this.boardOptions = options;

    // Capture the board element
    const boardElement: HTMLElement = this.boards.nativeElement;
    // Scroll to the board element
    boardElement.scrollIntoView({ behavior: 'smooth' });
  }
}
