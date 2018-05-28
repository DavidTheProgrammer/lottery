import { Component, OnChanges, Input } from '@angular/core';
import { IBoardOptions } from '../board-options.interface';
import { IBoardSelection } from './board-selection.interface';

import * as rn from 'random-number';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnChanges {
  @Input() boardOptions: IBoardOptions;

  pool: Array<number>;
  selectionsPerBoard: Array<any>;
  boardsToGenerate: Array<IBoardSelection> = [];

  ngOnChanges() {
    if (!this.boardOptions) {
      return;
    }
    // Reset Boards to generate
    this.boardsToGenerate = [];

    // BUild an empty array of length sizeOfPool and obtain indexes
    const poolArray = new Array(this.boardOptions.sizeOfPool).keys();
    // Build array from above empty array
    this.pool = Array.from(poolArray, num => ++num);

    this._generateBoards();
  }

  private _generateBoards(): void {
    const numberOfBoards = this.boardOptions.numberOfBoards;
    const uniqueNumbersOnly = this.boardOptions.uniqueNumbersOnly;
    const selectionsPerBoard = this.boardOptions.selectionsPerBoard;

    // If it's a single board to generate
    if (numberOfBoards === 1) {
      const pool = this.pool.slice();
      const boardName = undefined;
      const numbersToHighlight = this._selectNumbersFromArray(
        pool,
        selectionsPerBoard
      );

      // Push the just generated board to the top.
      this.boardsToGenerate.push({
        boardName: boardName,
        numbersToHighlight: numbersToHighlight
      });

      // Exit
      return;
    }

    if (uniqueNumbersOnly) {
      // Generate no repeats
      let pool = this.pool.slice();
      const selectedNumbers = [];

      for (let i = 0; i < numberOfBoards; i++) {
        const boardName = `Board ${i + 1}`;
        const numbersToHighlight = this._selectNumbersFromArray(
          pool,
          selectionsPerBoard
        );

        this.boardsToGenerate.push({
          boardName: boardName,
          numbersToHighlight: numbersToHighlight
        });

        selectedNumbers.push(...numbersToHighlight);
        pool = pool.filter(x => !numbersToHighlight.includes(x));
      }
    } else {
      // Similar to single board but for board name
      const pool = this.pool.slice();

      for (let i = 0; i < numberOfBoards; i++) {
        const boardName = `Board ${i + 1}`;
        const numbersToHighlight = this._selectNumbersFromArray(
          pool,
          selectionsPerBoard
        );

        // Push the just generated board to the top.
        this.boardsToGenerate.push({
          boardName: boardName,
          numbersToHighlight: numbersToHighlight
        });
      }
    }
  }

  private _selectNumbersFromArray(
    numbers: Array<number>,
    numberOfSelections: number
  ): Array<number> {
    const selectedNumbers = [];

    for (let i = 0; i < numberOfSelections; i++) {
      const selectedNumber = this._selectRandomValue(numbers);

      selectedNumbers.push(selectedNumber);
      numbers = numbers.filter(x => !selectedNumbers.includes(x));
    }

    return selectedNumbers;
  }

  private _selectRandomValue<T>(array: Array<T>): T {
    // If there's only one item return it
    if (array.length === 1) {
      return array[0];
    }

    const options = {
      min: 0,
      max: array.length - 1,
      integer: true
    };

    const index = rn(options);

    return array[index];
  }
}
