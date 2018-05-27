import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBoardOptions } from '../board-options.interface';

@Component({
  selector: 'app-board-options',
  templateUrl: './board-options.component.html',
  styleUrls: ['./board-options.component.scss']
})
export class BoardOptionsComponent implements OnInit {
  @Output() generateBoards = new EventEmitter<IBoardOptions>();
  optionsForm: FormGroup;
  numberOfBoardsOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  generateButtonIsDisabled = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.optionsForm = this._fb.group({
      sizeOfPool: [32, Validators.required],
      selectionsPerBoard: [6, Validators.required],
      numberOfBoards: [5, Validators.required],
      uniqueNumbersOnly: [false, Validators.required]
    });

    // Subscribe to the form changes and validate the options
    this.optionsForm.valueChanges.subscribe(formValues => {
      this._validateUniqueNumbersOptions(formValues);
    });
  }

  generateOptions() {
    const formValues = this.optionsForm.value;

    const boardOptions: IBoardOptions = {
      sizeOfPool: formValues.sizeOfPool,
      selectionsPerBoard: formValues.selectionsPerBoard,
      numberOfBoards: formValues.numberOfBoards,
      uniqueNumbersOnly: formValues.uniqueNumbersOnly
    };

    this.generateBoards.emit(boardOptions);

    this.generateButtonIsDisabled = true;

    setTimeout(() => {
      this.generateButtonIsDisabled = false;
    }, 2000);
  }

  private _validateUniqueNumbersOptions(formValues: any): void {
    const uniqueNumbersOnly = formValues.uniqueNumbersOnly;

    if (uniqueNumbersOnly) {
      const sizeOfPool = formValues.sizeOfPool;
      const selectionsPerBoard = formValues.selectionsPerBoard;
      const numberOfBoards = formValues.numberOfBoards;

      const numbersToGenerate = selectionsPerBoard * numberOfBoards;

      // Disable the generate button if the numbers to generate are larger than the pool;
      this.generateButtonIsDisabled = numbersToGenerate > sizeOfPool;
    } else {
      this.generateButtonIsDisabled = false;
    }
  }
}
