import {
  Component,
  OnChanges,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

import { IBoardOptions } from '../board-options.interface';
import { IBoardSelection } from './board-selection.interface';

import * as rn from 'random-number';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  animations: [
    trigger('boardsAnimations', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('100ms', [
            animate(
              '500ms ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class BoardsComponent implements OnChanges {
  @Input() boardOptions: IBoardOptions;
  @Output() animationDone = new EventEmitter();

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

  enterAnimationDone(event: AnimationEvent): void {
    this.animationDone.emit();
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

    // If the passed in array is equal in length to the number of selections return the array as the selection.
    if (numbers.length === numberOfSelections) {
      return numbers;
    }

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
