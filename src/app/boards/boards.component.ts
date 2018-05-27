import { Component, OnChanges, Input } from '@angular/core';
import { IBoardOptions } from '../board-options.interface';

import * as rn from 'random-number';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnChanges {
  @Input() boardOptions: IBoardOptions;

  boardsToGenerate: Array<any>;
  ngOnChanges() {
    if (!this.boardOptions) {
      return;
    }

    this.boardsToGenerate = new Array(this.boardOptions.numberOfBoards);
    console.log(this.boardOptions);
  }
}
